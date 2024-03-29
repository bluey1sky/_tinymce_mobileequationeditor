tinymce.create('tinymce.plugins.EquationEditorPlugin', {
  init(editor, url) {
    let editing = null;
    function clean(s) {
      if (!s) {
        return '';
      }
      return s.replace(/^\$+/, '').replace(/\$+$/, '');
    }

    function processContent(content) {

      console.log("processContent -13");
      // The entire body is being replaced and we don't know if formulas are in the $$ format.
      // Or surrounded by <span class="mathlatex">$$x+5</span>.
      let formulas = content.replace(/<span class="mathlatex(.*?)">\$\$(.*?)\$\$<\/span>/g, '$$$$$2$$$$');
      // Convert $$ delimeted latex into <span class="mathlatex">x+1</span> elements.
      // Test string "<p>this should be ingored</p><p>this too $$ and this</p>
      // <p>And this should match $$x+4=4$$</p>
      // <p>This too 3 $$ is how you use<span>the $$ chars</span></p>"
      // <p>To use double dollar signs making them bold like <b>$$</b> will allow them to be ignored</p>
      formulas = formulas.replace(/\$\$(.*?)(\$\$|<\/[a-z]|<[a-z]+>)/g,
        function (match) {
          if (match.match(/^\$\$(.*)\$\$$/)) {
            // This starts and stops with a $$ so it looks like a formula.
            return match.replace(/\$\$(.*?)(\$\$|<\/[a-z]|<[a-z]+>)/g, '<span class="mathlatex">$1</span>');
          } else {
            // This ends with a tag and is not likely a function.
            // One potential match would be <x>.
            return match;
          }
        });
      return formulas;
    }

    const MQ = MathQuill.getInterface(2);

    editor.addCommand('mceMathquill', function(existing_latex) {
      let popup;
      if (!existing_latex) {
        existing_latex = '';
      }
      var height = window.innerHeight-100;
      if (height > 400) {
        height = 400;
      }
      if (height < 400) {
        height = window.innerHeight;
      }
      var width = window.innerWidth-20;
      if (window.innerWidth < 350) {
        width = window.innerWidth;
      }
      if (width > 820) {
        width = 820;
      }

      if (editor.settings.equationeditor_inline) {
        console.log("editor.settings.equationeditor_inline");
        
        var div = $('<div></div>');
        div.addClass('equation-editor fixedbottom');
        $('body').append(div);
        var equationEditor = new EquationEditor.EquationEditorView(null, {
          $el: $(div),
          existingLatex: existing_latex,
          restrictions: top.tinymce.equationEditorRestrictions,
          editor: editor,
          inline: true
        }).render();

        equationEditor.find('.eq-close').on('click', function (e) {
            e.stopPropagation();
            editing = null;
            div.remove();
            $('.popover').remove();
        });

        equationEditor.find('.eq-insert').on('click', function (e) {
            e.stopPropagation();
            const latex = equationEditor.mathfield.latex();
            div.remove();
            $('.popover').remove();
            editor.execCommand('mceMathquillInsert', latex);
        });
        return;
      }

      popup = editor.windowManager.open(
        {
          url: url+'/equation_editor.html'+'?'+(Math.random()*10000),
          layout: 'flex',
          padding: 0,
          margin: 0,
          height: height,
          width: width,
          title: 'Equation Editor',
          buttons: [
            {
              text: 'Insert',
              subtype: 'primary',
              onclick() {
                const latex = editor.windowManager.getParams()['latexInput'].mathfield.latex();
                editor.execCommand('mceMathquillInsert', latex);
                return true;
              }
            },
            {
              text: 'Cancel',
              onclick() {
                editing = null;
                return editor.windowManager.getWindows()[0].close();
              }
            }
          ],
          onClose: function () {
            editing = null;
            return true;
          }
        },
        {
          plugin_url: url,
          existing_latex,
        }
      );
      return popup;
    });

    editor.addCommand('mceMathquillInsert', function(latex) {
      if (!latex) { return; }

      const content = `&nbsp;<span class="mathlatex">${latex}</span>&nbsp;`;
      console.log("editor.addCommand");

      if (editing) {
        editor.selection.select(editing);
      }
      editing = null;

      console.log("before call editor.selection.setContent(content)");
      var result = editor.selection.setContent(content);
      console.log("after call editor.selection.setContent(content)");
      if (SmartPhone.isAny()) {
        document.activeElement.blur();
      }
      const win = editor.windowManager.getWindows()[0];
      if (win) {
        win.close();
      }
      return result;
    });

    editor.on('init', () => {
      console.log("editor.on init -154");

      const link = document.createElement('link')
      link.type = 'text/css'
      link.rel = 'stylesheet'
      link.src = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css'
      document.head.appendChild(link)

      // Chrome on android rarely fires the click event but always the touchend.
      $(editor.getBody()).on('touchend', 'span.mathlatex', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (editing) {
          return;
        }
        editing = this;
        const latex = clean($(this).find('.mq-selectable').text());
        return editor.execCommand('mceMathquill', latex);
      });

      $(editor.getBody()).on('click', 'span.mathlatex', function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (editing) {
          return;
        }
        editing = this;
        const latex = clean($(this).find('.mq-selectable').text());
        console.log("init latex", latex); // 수식 함수를 클릭한 후에 실행이 됨.
        return editor.execCommand('mceMathquill', latex);
      });
    });
    
    // Add button to tool bar.
    editor.addButton('mobileequationeditor', {
      title: 'Equation editor',
      cmd: 'mceMathquill',
      text: 'f(x)'
    });

    // The contents are being taking from the dom. Remove MathQuill formatting.
    editor.on('PreProcess', function(ed) {
      const mathquills = ed.node.getElementsByClassName('mathlatex');
      console.log("PreProcess -190");
      if (mathquills.length > 0) {
        let result = [];
        for (let i = 0; i < mathquills.length; i++) {
          let math = mathquills[i].querySelector('.mq-selectable');
          if (math) {
            mathquills[i].innerHTML = '$$'+clean(math.innerHTML)+'$$';
            console.log("PreProcess mathquills[i].innerHTML -197", mathquills[i].innerHTML);
            
          }
        }
      }
    });

    // Before SetContent is called before the html is inserted into the dom.
    editor.on('BeforeSetContent', function(ed) {
      console.log("BeforeSetContent -213");
      if (ed.content) {
        ed.content = processContent(ed.content);
      }
    });


    const createEquation = () => {
      const equ = "\\left(x+y\\right)^n=\\sum_{k=0}^{n} \\binom{n}{k}x^ky^{n-k}"
      editor.insertContent(`
	  <span class="katex">
		${equ}
	  </span>
	`.trim())

      setTimeout(rerenderLaTeX, 1000)
    }

    const rerenderLaTeX = () => {

      const body = $(editor.getBody());
      const spans = $(body).find('span.katex');

      console.log('Rendering katex, found ' + spans.length + ' spans')

      spans.each(index => {
        const span = spans[index]
        const kequation = span.innerHTML
        console.log("katex equation : ", kequation);

        katex.render(kequation, span, { displayMode: true })
      })
    }

    // Use mathquill-rendered-latex when setting the contents of the document.
    // Set content is called after the html is in place.
    editor.on('SetContent', function(ed) {
      const mathquills = ed.target.dom.select('span.mathlatex');
      console.log("SetContent -249");
      //createEquation();
      //katex.render("f(a,b,c) = (a^2+b^2+c^2)^3", katex);

      // createEquation();
      rerenderLaTeX();

      if (mathquills.length > 0) {
        let result = [];
        for (let i = 0; i < mathquills.length; i++) {
          if ($(mathquills[i]).find('.mq-selectable').length) {
            // result[i] = MQ.StaticMath(mathquills[i]).reflow();
            //result[i] = katex.render(mathquills[i]).reflow();
            //createEquation();
            console.log("SetContent-1-261");
            console.log("mathquills[i]", mathquills[i]);
          } else {
              // MathQuill does not support \mathbb{}.
              mathquills[i].innerHTML = mathquills[i].innerHTML.replace(/mathbb{([A-Za-z0-9]+)}/, '$1');
              result[i] = MQ.StaticMath(mathquills[i]).reflow();
              //result[i] = katex.render(mathquills[i]);            
            //createEquation();
            console.log("SetContent-2 -273");
            console.log("result[i] -274", result[i]);
          }
        }
        return result;
      }
    });
  }
  ,

  getInfo() {
    return {
      longname:  'Equation Editor',
      author:    'Charles Verge, derived from https://github.com/laughinghan/tinymce_mathquill_plugin and https://github.com/foraker/tinymce_equation_editor',
      authorurl: 'https://github.com/charlesverge/tinymce_mobileequationeditor',
      infourl:   'https://github.com/charlesverge/tinymce_mobileequationeditor',
      version:   '2.0'
    };
  }
});
tinymce.PluginManager.add('mobileequationeditor', tinymce.plugins.EquationEditorPlugin);

function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}
