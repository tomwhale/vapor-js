'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var renderVapor = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref5) {
    var component = _ref5.component,
        _ref5$props = _ref5.props;
    _ref5$props = _ref5$props === undefined ? {} : _ref5$props;

    var _ref5$props$children = _ref5$props.children,
        children = _ref5$props$children === undefined ? [] : _ref5$props$children,
        staticProps = _objectWithoutProperties(_ref5$props, ['children']);

    var props, Component, renderedComponent, renderedChildren;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return component.vaporFetch();

          case 2:
            props = _context.sent;
            Component = new component(props, staticProps);
            renderedComponent = Component.render();
            _context.next = 7;
            return Promise.all(children.map(renderVapor));

          case 7:
            renderedChildren = _context.sent;
            return _context.abrupt('return', renderedComponent.replace(vaporChildrenId, renderedChildren.join('\n')));

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function renderVapor(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

// Temporary...


function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import React from 'react'
// import express from 'express'
// const app = express()
// const port = 1337

/*
  TODO
  Instead of dropping something like this on each component's markup
  we will be dropping a URL between the {V{ }V} children identifiers.
  These will be generated by a <FetchComponent /> which will drop the
  children identifiers with the URL between them.

  Instead of lazily replacing the identifier with all children, when
  an identifier is found the URL is called and the result is rendered
  in it's place.
 */
var vaporChildrenId = '{V{children}V}';

// Make a Vapor HOC that intercepts children somehow?
// HOC could intercept children and replace with vaporChildrenId??

// Basic idea of what Vapor class might look like

var Vapor = function () {
  function Vapor() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var staticProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Vapor);

    if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object') {
      throw new Error('Vapor: Props should be a plain object, instead found ' + (typeof props === 'undefined' ? 'undefined' : _typeof(props)));
    }

    this.props = _extends({}, props, staticProps);
  }

  _createClass(Vapor, [{
    key: 'hasChildren',
    value: function hasChildren() {
      return this.render().includes(vaporChildrenId);
    }
  }], [{
    key: 'vaporFetch',
    value: function vaporFetch() {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve({ title: 'Welcome to Vapor!', content: 'Lorem ipsum...' });
        }, 500);
      });
    }
  }]);

  return Vapor;
}();

var Example = function (_Vapor) {
  _inherits(Example, _Vapor);

  function Example() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Example.__proto__ || Object.getPrototypeOf(Example)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      return '\n    <div class="example">\n      <h1>' + _this.props.title + '</h1>\n      <p>' + _this.props.content + '</p>\n      ' + vaporChildrenId + '\n    </div>\n  ';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Example;
}(Vapor);

var ChildExample = function (_Vapor2) {
  _inherits(ChildExample, _Vapor2);

  function ChildExample() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, ChildExample);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = ChildExample.__proto__ || Object.getPrototypeOf(ChildExample)).call.apply(_ref2, [this].concat(args))), _this2), _this2.render = function () {
      return '\n    <div class="child-example">\n      <h3>' + _this2.props.title + '</h3>\n      <p>' + _this2.props.content + '</p>\n      ' + vaporChildrenId + '\n    </div>\n  ';
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  return ChildExample;
}(Vapor);

var ChildExample2 = function (_Vapor3) {
  _inherits(ChildExample2, _Vapor3);

  function ChildExample2() {
    var _ref3;

    var _temp3, _this3, _ret3;

    _classCallCheck(this, ChildExample2);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this3 = _possibleConstructorReturn(this, (_ref3 = ChildExample2.__proto__ || Object.getPrototypeOf(ChildExample2)).call.apply(_ref3, [this].concat(args))), _this3), _this3.render = function () {
      return '\n    <div class="child-example-2">\n      <h3>' + _this3.props.title + '</h3>\n      <img class="vapor-img" src="' + _this3.props.img + '" alt="Vapor">\n    </div>\n  ';
    }, _temp3), _possibleConstructorReturn(_this3, _ret3);
  }

  return ChildExample2;
}(Vapor);

var VaporTree = {
  component: Example,
  props: {
    title: 'Example Title',
    content: 'Lorem ipsum...',
    children: [{
      component: ChildExample,
      props: {
        title: 'Child Example',
        content: 'Some more content...',
        children: [{
          component: ChildExample2,
          props: {
            title: 'About Vapor',
            img: 'http://shopvape.net/wp-content/uploads/2017/06/H%C3%9AT-VAPE-B%E1%BB%8A-S%E1%BA%B6C-V%C3%80-C%C3%81CH-KH%E1%BA%AEC-PH%E1%BB%A4C.jpg'
          }
        }]
      }
    }, {
      component: ChildExample,
      props: {
        title: 'Child Example',
        content: 'Some more content...'
      }
    }]
  }

  // The below should happen inside an HOC in the client (React components anyway)
  // VaporReact should have it's own equivalent function like this for SSR
};var generateMarkup = function generateMarkup(_ref6) {
  var _ref6$vapor = _ref6.vapor,
      vapor = _ref6$vapor === undefined ? '' : _ref6$vapor,
      _ref6$styles = _ref6.styles,
      styles = _ref6$styles === undefined ? '' : _ref6$styles;
  return '\n  <html>\n    <head>\n      <title>Vapor</title>\n      <style>' + styles + '</style>\n    </head>\n    <body>\n      ' + vapor + '\n    </body>\n  </html>\n';
};

var styles = '\n  .vapor-img {\n    height: 125px;\n    width: 125px;\n  }\n';

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var vapor;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return renderVapor(VaporTree);

        case 2:
          vapor = _context2.sent;
          return _context2.abrupt('return', generateMarkup({ vapor: vapor, styles: styles }));

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
}));

// Just to render something in a browser...
// app.get('*', async (req, res) => {
//   try {
//     const vapor = await renderVapor(VaporTree)
//     const html = generateMarkup({ vapor, styles })
//
//     res.status(200)
//     res.send(html)
//   } catch (err) {
//     res.status(500)
//     res.send(err)
//   }
// })
//
// app.listen(port)
