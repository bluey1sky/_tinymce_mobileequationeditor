"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.EquationEditor = {};

var EquationEvents = function () {
  function EquationEvents() {
    _classCallCheck(this, EquationEvents);

    this.reset();
  }

  _createClass(EquationEvents, [{
    key: "on",
    value: function on(name, callback, context) {
      if (!this._events) {
        this._events = {};
      }
      if (!this._events[name]) {
        this._events[name] = [];
      }
      return this._events[name].push({ callback: callback, context: context || this });
    }
  }, {
    key: "trigger",
    value: function trigger(name) {
      var events = void 0;
      if (!this._events) {
        return;
      }
      var args = Array.prototype.slice.call(arguments, 1);
      if (events = this._events[name]) {
        return this.triggerEvents(events, args);
      }
    }
  }, {
    key: "triggerEvents",
    value: function triggerEvents(events, args) {
      for (var i = 0; i < events.length; i++) {
        if (args) {
          var _events$i$callback;

          (_events$i$callback = events[i].callback).call.apply(_events$i$callback, [events[i].context].concat(_toConsumableArray(Array.from(args))));
        } else {
          events[i].callback.call(events[i].context);
        }
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this._events = {};
    }
  }]);

  return EquationEvents;
}();

;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

EquationEditor.View = function () {
  _createClass(View, [{
    key: "find",
    value: function find(selector) {
      return this.$el.find(selector);
    }
  }]);

  function View(events, options) {
    _classCallCheck(this, View);

    this.Events = events ? events : new EquationEvents();;
    this.options = options;
    this.$el = this.options.$el || $(this.options.el);
    this.initialize.apply(this, arguments);
  }

  _createClass(View, [{
    key: "initialize",
    value: function initialize() {}
  }, {
    key: "createElement",
    value: function createElement() {
      return this.$el = $(this.template());
    }
  }]);

  return View;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

EquationEditor.CollapsibleView = function (_EquationEditor$View) {
  _inherits(CollapsibleView, _EquationEditor$View);

  function CollapsibleView() {
    var _ref;

    _classCallCheck(this, CollapsibleView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = CollapsibleView.__proto__ || Object.getPrototypeOf(CollapsibleView)).call.apply(_ref, [this].concat(args)));

    _this.toggleCollapse = _this.toggleCollapse.bind(_this);
    return _this;
  }

  _createClass(CollapsibleView, [{
    key: 'initialize',
    value: function initialize() {
      return this.find('.collapsible-box-toggle').on('click', jQuery.proxy(this.toggleCollapse, this));
    }
  }, {
    key: 'toggleCollapse',
    value: function toggleCollapse(e) {
      e.preventDefault();
      if (this.find('.box-content-collapsible').is(':visible')) {
        return this.closeCollapsible();
      } else {
        return this.openCollapsible();
      }
    }
  }, {
    key: 'openCollapsible',
    value: function openCollapsible() {
      this.find('.box-content-collapsible').slideDown();
      return this.toggleOpenClass();
    }
  }, {
    key: 'closeCollapsible',
    value: function closeCollapsible() {
      this.find('.box-content-collapsible').slideUp();
      return this.toggleOpenClass();
    }
  }, {
    key: 'toggleOpenClass',
    value: function toggleOpenClass() {
      return this.find('.collapsible-box-toggle').toggleClass('collapsible-box-toggle-open');
    }
  }]);

  return CollapsibleView;
}(EquationEditor.View);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

EquationEditor.Buttons = {};

EquationEditor.Buttons.BaseButtonView = function (_EquationEditor$View) {
  _inherits(BaseButtonView, _EquationEditor$View);

  function BaseButtonView(events, options) {
    _classCallCheck(this, BaseButtonView);

    var _this = _possibleConstructorReturn(this, (BaseButtonView.__proto__ || Object.getPrototypeOf(BaseButtonView)).call(this, events, options));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(BaseButtonView, [{
    key: 'initialize',
    value: function initialize() {
      this.latex = this.options.latex;
      this.buttonText = this.options.buttonText || this.options.latex;
      return this.className = this.options.className ? this.options.className.trim() : '';
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      e.preventDefault();
      e.stopPropagation();
      return this.Events.trigger('latex:' + this.event, this.latex);
    }
  }, {
    key: 'render',
    value: function render() {
      this.createElement();
      this.find('button').on('click', jQuery.proxy(this.handleClick, this));
      return this;
    }
  }, {
    key: 'template',
    value: function template() {
      return '    <div class="' + this.className + '">\n      <button type="button" class="btn btn-lg btn-outline-dark math-render" title="' + this.buttonText + '">' + this.buttonText + '</button>\n    </div>';
    }
  }]);

  return BaseButtonView;
}(EquationEditor.View);

var Cls = EquationEditor.Buttons.CommandButtonView = function (_EquationEditor$Butto) {
  _inherits(CommandButtonView, _EquationEditor$Butto);

  function CommandButtonView() {
    _classCallCheck(this, CommandButtonView);

    return _possibleConstructorReturn(this, (CommandButtonView.__proto__ || Object.getPrototypeOf(CommandButtonView)).apply(this, arguments));
  }

  _createClass(CommandButtonView, null, [{
    key: 'initClass',
    value: function initClass() {
      this.prototype.event = 'command';
    }
  }]);

  return CommandButtonView;
}(EquationEditor.Buttons.BaseButtonView);
Cls.initClass();

Cls = EquationEditor.Buttons.WriteButtonView = function (_EquationEditor$Butto2) {
  _inherits(WriteButtonView, _EquationEditor$Butto2);

  function WriteButtonView() {
    _classCallCheck(this, WriteButtonView);

    return _possibleConstructorReturn(this, (WriteButtonView.__proto__ || Object.getPrototypeOf(WriteButtonView)).apply(this, arguments));
  }

  _createClass(WriteButtonView, null, [{
    key: 'initClass',
    value: function initClass() {
      this.prototype.event = 'write';
    }
  }]);

  return WriteButtonView;
}(EquationEditor.Buttons.BaseButtonView);
Cls.initClass();

Cls = EquationEditor.Buttons.KeystrokeButtonView = function (_EquationEditor$Butto3) {
  _inherits(KeystrokeButtonView, _EquationEditor$Butto3);

  function KeystrokeButtonView() {
    _classCallCheck(this, KeystrokeButtonView);

    return _possibleConstructorReturn(this, (KeystrokeButtonView.__proto__ || Object.getPrototypeOf(KeystrokeButtonView)).apply(this, arguments));
  }

  _createClass(KeystrokeButtonView, null, [{
    key: 'initClass',
    value: function initClass() {
      this.prototype.event = 'keystroke';
    }
  }]);

  return KeystrokeButtonView;
}(EquationEditor.Buttons.BaseButtonView);
Cls.initClass();

Cls = EquationEditor.Buttons.TypedTextButtonView = function (_EquationEditor$Butto4) {
  _inherits(TypedTextButtonView, _EquationEditor$Butto4);

  function TypedTextButtonView() {
    _classCallCheck(this, TypedTextButtonView);

    return _possibleConstructorReturn(this, (TypedTextButtonView.__proto__ || Object.getPrototypeOf(TypedTextButtonView)).apply(this, arguments));
  }

  _createClass(TypedTextButtonView, null, [{
    key: 'initClass',
    value: function initClass() {
      this.prototype.event = 'typedtext';
    }
  }]);

  return TypedTextButtonView;
}(EquationEditor.Buttons.BaseButtonView);
Cls.initClass();

Cls = EquationEditor.Buttons.MenuButtonView = function (_EquationEditor$Butto5) {
  _inherits(MenuButtonView, _EquationEditor$Butto5);

  function MenuButtonView() {
    _classCallCheck(this, MenuButtonView);

    return _possibleConstructorReturn(this, (MenuButtonView.__proto__ || Object.getPrototypeOf(MenuButtonView)).apply(this, arguments));
  }

  _createClass(MenuButtonView, [{
    key: 'handleClick',
    value: function handleClick(e) {
      // Menu buttons are handled by popovers.
      return true;
    }
  }, {
    key: 'template',
    value: function template() {
      return '    <div class="' + this.className + '">\n      <a tabindex="0" class="btn btn-lg btn-outline-dark math-render" title="' + this.buttonText + '" data-menuname="' + this.options.menuname + '">' + this.buttonText + '</button>\n    </div>';
    }
  }], [{
    key: 'initClass',
    value: function initClass() {
      this.prototype.event = 'menu';
    }
  }]);

  return MenuButtonView;
}(EquationEditor.Buttons.BaseButtonView);
Cls.initClass();

Cls = EquationEditor.Buttons.SpaceView = function (_EquationEditor$Butto6) {
  _inherits(SpaceView, _EquationEditor$Butto6);

  function SpaceView() {
    _classCallCheck(this, SpaceView);

    return _possibleConstructorReturn(this, (SpaceView.__proto__ || Object.getPrototypeOf(SpaceView)).apply(this, arguments));
  }

  _createClass(SpaceView, [{
    key: 'template',
    value: function template() {
      return '    <div class="' + this.className + '">\n      &nbsp;\n    </div>';
    }
  }], [{
    key: 'initClass',
    value: function initClass() {
      this.prototype.event = 'noop';
    }
  }]);

  return SpaceView;
}(EquationEditor.Buttons.BaseButtonView);
Cls.initClass();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

EquationEditor.ButtonGroupView = function (_EquationEditor$View) {
  _inherits(ButtonGroupView, _EquationEditor$View);

  function ButtonGroupView(events, options) {
    _classCallCheck(this, ButtonGroupView);

    var _this = _possibleConstructorReturn(this, (ButtonGroupView.__proto__ || Object.getPrototypeOf(ButtonGroupView)).call(this, events, options));

    _this.toggle = _this.toggle.bind(_this);
    return _this;
  }

  _createClass(ButtonGroupView, [{
    key: 'initialize',
    value: function initialize() {
      this.groupName = this.options.groupName;
      return this.buttonViews = this.options.buttonViews;
    }
  }, {
    key: 'render',
    value: function render() {
      this.createElement();
      this.renderButtons();
      new EquationEditor.CollapsibleView({ $el: this.$el });
      this.find('header').click(this.toggle);
      return this;
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      return this.find('.collapsible-box-toggle').click();
    }
  }, {
    key: 'renderButtons',
    value: function renderButtons() {
      var _this2 = this;

      return Array.from(this.buttonViews).map(function (buttonView) {
        return _this2.find('.buttons').append(buttonView.render().$el);
      });
    }
  }, {
    key: 'template',
    value: function template() {
      return '<div class="button-group collapsible">\n  <a href=\'#\' class=\'collapsible-box-toggle ss-dropdown\'></a> <header>' + this.groupName + '</header>\n\n  <div class="buttons box-content-collapsible hidden"></div>\n</div>';
    }
  }]);

  return ButtonGroupView;
}(EquationEditor.View);
"use strict";

EquationEditor.ButtonViewFactory = {
  create: function create(events, config) {
    var buttons = [];
    if (!config) {
      throw "Empty configuration from config.json";
    }
    for (var i = 0; i < config.length; i++) {
      var klass = eval(config[i].klass);
      buttons.push(new klass(events, config[i]));
    }
    return buttons;
  }
};
"use strict";

EquationEditor.ButtonGroupViewFactory = {
  create: function create(events, config) {
    var buttonGroups = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Array.from(config)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var buttonGroupConfig = _step.value;

        buttonGroupConfig.buttonViews = EquationEditor.ButtonViewFactory.create(events, buttonGroupConfig.buttonViews);
        buttonGroups.push(new EquationEditor.ButtonGroupView(events, buttonGroupConfig));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return buttonGroups;
  }
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EquationEditor = EquationEditor,
    Buttons = _EquationEditor.Buttons;

var ButtonGroup = EquationEditor.ButtonGroupView;

(function () {
  var MQ = undefined;
  var Cls = EquationEditor.EquationEditorView = function (_EquationEditor$View) {
    _inherits(EquationEditorView, _EquationEditor$View);

    function EquationEditorView(events, options) {
      _classCallCheck(this, EquationEditorView);

      return _possibleConstructorReturn(this, (EquationEditorView.__proto__ || Object.getPrototypeOf(EquationEditorView)).call(this, events, options));
    }

    _createClass(EquationEditorView, [{
      key: 'initialize',
      value: function initialize() {
        this.$el.html(this.template());
        this.handleCommandButton = this.handleCommandButton.bind(this);
        this.handleKeystrokeButton = this.handleKeystrokeButton.bind(this);
        this.handleTypedTextButton = this.handleTypedTextButton.bind(this);
        this.handleWriteButton = this.handleWriteButton.bind(this);
        this.focus = this.focus.bind(this);
        $('.eq-symbols').hide();
        this.existingLatex = this.options.existingLatex;
        this.editor = this.options.editor;
        this.restrictions = this.options.restrictions || {};
        this.Events.on('latex:command', this.handleCommandButton, this);
        this.Events.on('latex:typedtext', this.handleTypedTextButton, this);
        this.Events.on('latex:keystroke', this.handleKeystrokeButton, this);
        this.Events.on('latex:menu', this.handleMenuButton, this);
        this.find('.math').on('keypress', this.keystrokeEvent.bind(this));
        this.find('.eq-delete').on('click', this.handleDeleteButton.bind(this));
        if (!this.options.inline) {
          this.find('.eq-insert').on('click', this.handleInsertButton.bind(this));
          this.find('.eq-close').parent().hide();
        }
        // Close popovers if another element is clicked.
        $(document).on('mouseup', function (e) {
          var container = $(".popover");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.popover("hide");
          }
        });
        return this.Events.on('latex:write', this.handleWriteButton, this);
      }
    }, {
      key: 'template',
      value: function template() {
        return '\n        <div class="container py-3">\n          <div class="row">\n            <div class="col-12 col-sm-12 mathquill-container">\n              <div class="math"></div>\n            </div>\n          </div>\n        </div>\n        <div class="container keyboard">\n          <div class="row no-gutters button-bar-0"></div>\n          <div class="row no-gutters">\n            <div class="col-sm-3 col-3 mt-1">\n              <div class="row no-gutters button-bar-1-0 mt-1 mr-1"></div>\n              <div class="row no-gutters button-bar-2-0 mt-1 mr-1"></div>\n              <div class="row no-gutters button-bar-3-0 mt-1 mr-1"></div>\n              <div class="row no-gutters button-bar-4-0 mt-1 mr-1"></div>\n            </div>\n            <div class="col-sm-7 col-7 mt-1">\n              <div class="row no-gutters button-bar-1-1 mt-1"></div>\n              <div class="row no-gutters button-bar-2-1 mt-1"></div>\n              <div class="row no-gutters button-bar-3-1 mt-1"></div>\n              <div class="row no-gutters button-bar-4-1 mt-1"></div>\n            </div>\n            <div class="col-sm-2 col-2 mt-1">\n              <div class="row no-gutters mt-1">\n                <div class="col">\n                  <button type="button" class="btn btn-secondary eq-delete std3hw"></button>\n                </div>\n              </div>\n              <div class="row no-gutters mt-1">\n                <div class="col">\n                  <button type="button" class="btn btn-secondary eq-menu std3hw">Menu</button>\n                </div>\n              </div>\n              <div class="row no-gutters mt-1">\n                <div class="col" style="height: 3em">\n                </div>\n              </div>\n              <div class="row no-gutters mt-1">\n                <div class="col">\n                  <button class="btn btn-outline-dark math-render std3hw eq-insert" title="return">\\hookleftarrow</button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class="container bottombtns">\n          <div class="row  mt-1">\n            <div class="col-6">\n              <button type="button" class="btn btn-primary eq-symbols float-left mr-1" title="Symbols">Symbols</button>\n            </div>\n            <div class="col-6 float-right">\n              <button type="button" class="btn btn-primary eq-insert float-right mr-1" title="Insert">Insert</button>\n              <button type="button" class="btn btn-secondary eq-close float-right mr-1" title="Close">Close</button>\n            </div>\n          </div>\n        </div>\n        ';
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        $.getJSON(this.editor.baseURI.source + '/plugins/mobileequationeditor/config.json').done(function (config) {
          _this2.config = config;
          _this2.addButtonBar();
          _this2.addMenuPopover();
          return _this2.enableMathMagic();
        }).fail(function (e) {
          console.log('config.json parse error');
          console.log(e);
        });
        return this;
      }
    }, {
      key: 'enableMathMagic',
      value: function enableMathMagic() {
        var mathquills = this.find('.math-render');
        if (mathquills.length > 0) {
          for (var i = 0, end = mathquills.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
            MQ.StaticMath(mathquills[i]);
            console.log("enableMathMagic"); // 수식을 클릭한 후에 실행이 됨.
          }
        }
        // MathQuill needs the DOM element not the jquery element.
        this.mathfield = MQ.MathField(this.input().get()[0]);
        if (this.existingLatex != null) {
          this.mathfield.latex(this.existingLatex);
        }
        if (window.innerWidth < 350) {
          this.find('.keyboard').css('width: ' + (window.innerWidth - 15) + 'px');
        }
        if (typeof SmartPhone !== 'undefined' && !SmartPhone.isAny()) {
          $('.enablevirtualkeyboard').hide();
        }
        return this.focus();
      }
    }, {
      key: 'input',
      value: function input() {
        return this.find('.math');
      }
    }, {
      key: 'addButtonBar',
      value: function addButtonBar() {
        for (var i = 0; i < 5; i++) {
          for (var j = 0; j < this.config['buttonBar' + i].length; j++) {
            if (Array.isArray(this.config['buttonBar' + i][j])) {
              // Structure is array of array.
              var buttons = this.buttonBarButtons(i, j);
              for (var k = 0; k < buttons.length; k++) {
                this.find('.button-bar-' + i + '-' + j).append(buttons[k].render().$el);
              }
            } else {
              var buttons = this.buttonBarButtons(i);
              for (var k = 0; k < buttons.length; k++) {
                this.find('.button-bar-' + i).append(buttons[k].render().$el);
              }
              break;
            }
          }
        }
      }
    }, {
      key: 'addMenuPopover',
      value: function addMenuPopover() {
        var mainmenu = new EquationMainMenu(this, this.config['mainMenu']);
        $(this.find('.eq-menu')).popover({
          content: function content() {
            return mainmenu.render();
          },
          html: true,
          container: 'body'
        });
        this.addSubMenuPopover();
      }
    }, {
      key: 'addSubMenuPopover',
      value: function addSubMenuPopover() {
        window.eq = this;
        for (var sub in this.config.subMenus) {
          $('.eq-menu-' + sub).popover({
            content: function content() {
              return this.showmenu.render();
            },
            trigger: 'click',
            html: true,
            title: this.config.subMenus[sub].title,
            container: 'body'
          });
          var menus = this.find('.eq-menu-' + sub).toArray();
          for (var i = 0; i < menus.length; i++) {
            var submenu = new EquationSubMenu(this, this.config.subMenus[sub]);
            menus[i].showmenu = submenu;
          }
        }
      }
    }, {
      key: 'buttonBarButtons',
      value: function buttonBarButtons(n, m) {
        if (typeof m !== 'undefined') {
          return EquationEditor.ButtonViewFactory.create(this.Events, this.config['buttonBar' + n][m]);
        }
        return EquationEditor.ButtonViewFactory.create(this.Events, this.config['buttonBar' + n]);
      }
    }, {
      key: 'handleCommandButton',
      value: function handleCommandButton(latex) {
        this.performCommand(latex);
        return this.focus();
      }
    }, {
      key: 'enableVirtualKeyboard',
      value: function enableVirtualKeyboard() {
        $('.popover').remove();
        $('.eq-symbols').show().on('click', this.disableVirtualKeyboard.bind(this));
        this.existingLatex = this.mathfield.latex();
        this.find('.keyboard').hide();
        this.find('.math').get()[0].innerHTML = '';
        MQ.config({ substituteTextarea: function substituteTextarea() {
            return $('<textarea autocapitalize=off autocomplete=off autocorrect=off ' + 'spellcheck=false x-palm-disable-ste-all=true />')[0];
          } });
        this.mathfield = MQ.MathField(this.find('.math').get()[0]);
        this.mathfield.latex(this.existingLatex);
        $('body').scrollTop(0);
        this.mathfield.focus();
        return true;
      }
    }, {
      key: 'disableVirtualKeyboard',
      value: function disableVirtualKeyboard() {
        $('.popover').remove();
        $('.eq-symbols').hide();
        this.existingLatex = this.mathfield.latex();
        this.find('.keyboard').show();
        this.find('.math').get()[0].innerHTML = '';
        MQ.config({
          substituteTextarea: function substituteTextarea() {
            var div = document.createElement('div');
            div.innerHTML = '<span tabindex=0></span>';
            return div.children[0];
          }
        });
        this.mathfield = MQ.MathField(this.find('.math').get()[0]);
        this.mathfield.latex(this.existingLatex);
        this.mathfield.focus();
        return true;
      }
    }, {
      key: 'handleDeleteButton',
      value: function handleDeleteButton(e) {
        e.preventDefault();
        e.stopPropagation();
        return this.mathfield.keystroke('Backspace');
      }
    }, {
      key: 'handleInsertButton',
      value: function handleInsertButton(e) {
        e.preventDefault();
        e.stopPropagation();
        return this.performKeystroke('InsertFormula');
      }
    }, {
      key: 'handleTypedTextButton',
      value: function handleTypedTextButton(typedtext) {
        this.mathfield.typedText(typedtext);
        return this.focus();
      }
    }, {
      key: 'handleMenuButton',
      value: function handleMenuButton(menu) {
        console.log('show ' + menu);
      }
    }, {
      key: 'handleKeystrokeButton',
      value: function handleKeystrokeButton(keystroke) {
        return this.performKeystroke(keystroke);
      }
    }, {
      key: 'handleWriteButton',
      value: function handleWriteButton(latex) {
        this.performWrite(latex);
        return this.focus();
      }
    }, {
      key: 'performCommand',
      value: function performCommand(latex) {
        return this.mathfield.cmd(latex);
      }
    }, {
      key: 'performWrite',
      value: function performWrite(latex) {
        return this.mathfield.write(latex);
      }
    }, {
      key: 'performKeystroke',
      value: function performKeystroke(latex) {
        // Key stroke short cuts can be located here. https://www.w3.org/TR/uievents-code/.
        if (latex == 'VirtualKeyboard') {
          return this.enableVirtualKeyboard();
        }
        if (latex == 'InsertFormula') {
          var _latex = this.mathfield.latex();
          var div = this.$el.get()[0];
          if (this.options.inline && div.parentNode) {
            div.parentNode.removeChild(div);
          }
          $('.popover').remove();
          var result = this.editor.execCommand('mceMathquillInsert', _latex);
          return result;
        }
        this.mathfield.keystroke(latex);
        this.focus();
      }
    }, {
      key: 'keystrokeEvent',
      value: function keystrokeEvent(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.charCode == 13 || e.key === 'Enter') {
          this.performKeystroke('InsertFormula');
        } else {
          // This allows a physical keyboard connected to a mobile device to continue to work.
          if (e.key) {
            this.mathfield.typedText(e.key);
          } else if (e.which) {
            // Ios does not have e.key completed.
            this.mathfield.typedText(String.fromCharCode(e.which));
          }
        }
        return true;
      }
    }, {
      key: 'focus',
      value: function focus() {
        if (typeof SmartPhone !== 'undefined' && SmartPhone.isAny()) {
          // Mobile devices hide virtual keyboard.
          setTimeout(function (e) {
            document.activeElement.blur();
          }, 500);
        } else {
          this.find('textarea').focus();
        }
      }
    }, {
      key: 'equationLatex',
      value: function equationLatex() {
        return this.mathfield.latex();
      }
    }, {
      key: 'getMQ',
      value: function getMQ() {
        return MQ;
      }
    }], [{
      key: 'initClass',
      value: function initClass() {
        MQ = MathQuill.getInterface(2);
        // For mobile devices disable keyboard.
        if (typeof SmartPhone !== 'undefined' && SmartPhone.isAny()) {
          MQ.config({
            substituteTextarea: function substituteTextarea() {
              var div = document.createElement('div');
              div.innerHTML = '<span tabindex=0></span>';
              return div.children[0];
            }
          });
        }
      }
    }]);

    return EquationEditorView;
  }(EquationEditor.View);
  Cls.initClass();
  return Cls;
})();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EquationMainMenu = function () {
  function EquationMainMenu(equationview, menu) {
    _classCallCheck(this, EquationMainMenu);

    this.equationview = equationview;
    this.menu = menu;
  }

  _createClass(EquationMainMenu, [{
    key: 'render',
    value: function render() {
      var div = $('<div></div>');
      for (var k in this.menu) {
        var row = $('<div class="row mt-1"></div>');
        div.append(row);
        for (var c in this.menu[k]) {
          var m = this.menu[k][c];
          if (this.equationview.config.subMenus && this.equationview.config.subMenus[m].title) {
            var button = '<div class="col-6">';
            button += '<a tabindex="0" class="btn btn-sm btn-submenu btn-secondary" ';
            button += 'data-menuname="' + m + '" title="' + this.equationview.config.subMenus[m].title + '"';
            button += '>' + this.equationview.config.subMenus[m].shorttitle + '</a></div>';
            row.append($(button));
          }
        }
      }

      this.renderSubMenus(div);
      return div;
    }
  }, {
    key: 'renderSubMenus',
    value: function renderSubMenus(target) {
      var menus = target.find('a[data-menuname]').toArray();
      for (var i = 0; i < menus.length; i++) {
        var sub = menus[i].getAttribute('data-menuname');
        if (sub) {
          var submenus = target.find('a[data-menuname="' + sub + '"]').toArray();
          for (var j = 0; j < menus.length; j++) {
            if ($(submenus[j]).data("bs.popover")) {
              continue;
            }
            $(submenus[j]).popover({
              content: function content() {
                return this.showmenu.render();
              },
              trigger: 'click',
              html: true,
              title: this.equationview.config.subMenus[sub].title,
              container: 'body'
            });
            var submenu = new EquationSubMenu(this.equationview, this.equationview.config.subMenus[sub]);
            menus[i].showmenu = submenu;
          }
        }
      }
    }
  }]);

  return EquationMainMenu;
}();

var EquationSubMenu = function () {
  function EquationSubMenu(equationview, menu) {
    _classCallCheck(this, EquationSubMenu);

    this.equationview = equationview;
    this.menu = menu;
  }

  _createClass(EquationSubMenu, [{
    key: 'render',
    value: function render() {
      var div = $('<div></div>');
      this.addButtons(div);
      return div;
    }
  }, {
    key: 'addButtons',
    value: function addButtons(div) {
      var buttons = EquationEditor.ButtonViewFactory.create(this.equationview.Events, this.menu.buttonViews);
      //var columnsize = (this.menu.length + this.menu.length%2)/2;
      var row = null;
      for (var i = 0; i < buttons.length; i++) {
        if (i % 2 == 0) {
          row = $('<div class="row mt-1"></div>');
          div.append(row);
        }
        var button = buttons[i].render().$el;
        button.find('button').addClass('btn-submenu');
        this.equationview.getMQ().StaticMath(button.find('.math-render').get()[0]);
        var col = $('<div class="col-6"></div>');
        col.append(button);
        row.append(col);
      }
    }
  }]);

  return EquationSubMenu;
}();
'use strict';

tinymce.create('tinymce.plugins.EquationEditorPlugin', {
  init: function init(editor, url) {
    var editing = null;
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
      var formulas = content.replace(/<span class="mathlatex(.*?)">\$\$(.*?)\$\$<\/span>/g, '$$$$$2$$$$');
      // Convert $$ delimeted latex into <span class="mathlatex">x+1</span> elements.
      // Test string "<p>this should be ingored</p><p>this too $$ and this</p>
      // <p>And this should match $$x+4=4$$</p>
      // <p>This too 3 $$ is how you use<span>the $$ chars</span></p>"
      // <p>To use double dollar signs making them bold like <b>$$</b> will allow them to be ignored</p>
      formulas = formulas.replace(/\$\$(.*?)(\$\$|<\/[a-z]|<[a-z]+>)/g, function (match) {
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

    var MQ = MathQuill.getInterface(2);

    editor.addCommand('mceMathquill', function (existing_latex) {
      var popup = void 0;
      if (!existing_latex) {
        existing_latex = '';
      }
      var height = window.innerHeight - 100;
      if (height > 400) {
        height = 400;
      }
      if (height < 400) {
        height = window.innerHeight;
      }
      var width = window.innerWidth - 20;
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
          var latex = equationEditor.mathfield.latex();
          div.remove();
          $('.popover').remove();
          editor.execCommand('mceMathquillInsert', latex);
        });
        return;
      }

      popup = editor.windowManager.open({
        url: url + '/equation_editor.html' + '?' + Math.random() * 10000,
        layout: 'flex',
        padding: 0,
        margin: 0,
        height: height,
        width: width,
        title: 'Equation Editor',
        buttons: [{
          text: 'Insert',
          subtype: 'primary',
          onclick: function onclick() {
            var latex = editor.windowManager.getParams()['latexInput'].mathfield.latex();
            editor.execCommand('mceMathquillInsert', latex);
            return true;
          }
        }, {
          text: 'Cancel',
          onclick: function onclick() {
            editing = null;
            return editor.windowManager.getWindows()[0].close();
          }
        }],
        onClose: function onClose() {
          editing = null;
          return true;
        }
      }, {
        plugin_url: url,
        existing_latex: existing_latex
      });
      return popup;
    });

    editor.addCommand('mceMathquillInsert', function (latex) {
      if (!latex) {
        return;
      }

      var content = '&nbsp;<span class="mathlatex">' + latex + '</span>&nbsp;';
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
      var win = editor.windowManager.getWindows()[0];
      if (win) {
        win.close();
      }
      return result;
    });

    editor.on('init', function () {
      console.log("editor.on init -154");

      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.src = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css';
      document.head.appendChild(link);

      // Chrome on android rarely fires the click event but always the touchend.
      $(editor.getBody()).on('touchend', 'span.mathlatex', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (editing) {
          return;
        }
        editing = this;
        var latex = clean($(this).find('.mq-selectable').text());
        return editor.execCommand('mceMathquill', latex);
      });

      $(editor.getBody()).on('click', 'span.mathlatex', function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (editing) {
          return;
        }
        editing = this;
        var latex = clean($(this).find('.mq-selectable').text());
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
    editor.on('PreProcess', function (ed) {
      var mathquills = ed.node.getElementsByClassName('mathlatex');
      console.log("PreProcess -190");
      if (mathquills.length > 0) {
        var result = [];
        for (var i = 0; i < mathquills.length; i++) {
          var math = mathquills[i].querySelector('.mq-selectable');
          if (math) {
            mathquills[i].innerHTML = '$$' + clean(math.innerHTML) + '$$';
            console.log("PreProcess mathquills[i].innerHTML -197", mathquills[i].innerHTML);
          }
        }
      }
    });

    // Before SetContent is called before the html is inserted into the dom.
    editor.on('BeforeSetContent', function (ed) {
      console.log("BeforeSetContent -213");
      if (ed.content) {
        ed.content = processContent(ed.content);
      }
    });

    var createEquation = function createEquation() {
      var equ = "\\left(x+y\\right)^n=\\sum_{k=0}^{n} \\binom{n}{k}x^ky^{n-k}";
      editor.insertContent(('\n\t  <span class="katex">\n\t\t' + equ + '\n\t  </span>\n\t').trim());

      setTimeout(rerenderLaTeX, 1000);
    };

    var rerenderLaTeX = function rerenderLaTeX() {

      var body = $(editor.getBody());
      var spans = $(body).find('span.katex');

      console.log('Rendering katex, found ' + spans.length + ' spans');

      spans.each(function (index) {
        var span = spans[index];
        var kequation = span.innerHTML;
        console.log("katex equation : ", kequation);

        katex.render(kequation, span, { displayMode: true });
      });
    };

    // Use mathquill-rendered-latex when setting the contents of the document.
    // Set content is called after the html is in place.
    editor.on('SetContent', function (ed) {
      var mathquills = ed.target.dom.select('span.mathlatex');
      console.log("SetContent -249");
      //createEquation();
      //katex.render("f(a,b,c) = (a^2+b^2+c^2)^3", katex);

      // createEquation();
      rerenderLaTeX();

      if (mathquills.length > 0) {
        var result = [];
        for (var i = 0; i < mathquills.length; i++) {
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
  },
  getInfo: function getInfo() {
    return {
      longname: 'Equation Editor',
      author: 'Charles Verge, derived from https://github.com/laughinghan/tinymce_mathquill_plugin and https://github.com/foraker/tinymce_equation_editor',
      authorurl: 'https://github.com/charlesverge/tinymce_mobileequationeditor',
      infourl: 'https://github.com/charlesverge/tinymce_mobileequationeditor',
      version: '2.0'
    };
  }
});
tinymce.PluginManager.add('mobileequationeditor', tinymce.plugins.EquationEditorPlugin);

function __range__(left, right, inclusive) {
  var range = [];
  var ascending = left < right;
  var end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}