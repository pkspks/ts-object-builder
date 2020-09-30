function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ObjectBuilderBase = /*#__PURE__*/function () {
  function ObjectBuilderBase(createType) {
    classCallCheck(this, ObjectBuilderBase);

    this.createType = createType;

    defineProperty(this, "values", new Map());

    defineProperty(this, "fieldsToExclude", []);
  }

  createClass(ObjectBuilderBase, [{
    key: "isNotExcluded",
    value: function isNotExcluded(field) {
      return this.fieldsToExclude.indexOf(field) === -1;
    }
  }, {
    key: "buildForIndex",
    value: function buildForIndex() {
      var _this = this;

      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var obj = this.createNewObject();
      this.fieldsToBuild.forEach(function (k) {
        // tslint:disable-next-line:no-non-null-assertion
        obj[k] = _this.values.get(k)(index);
      });
      return obj;
    }
  }, {
    key: "createNewObject",
    value: function createNewObject() {
      return new this.createType();
    }
  }, {
    key: "with",
    value: function _with(name, value) {
      if (typeof value === 'function') {
        this.values.set(name, value);
      } else {
        this.values.set(name, function () {
          return value;
        });
      }

      return this;
    }
  }, {
    key: "build",
    value: function build() {
      return this.buildForIndex(0);
    }
  }, {
    key: "buildList",
    value: function buildList(count) {
      var list = [];

      for (var i = 0; i < count; i++) {
        list.push(this.buildForIndex(i));
      }

      return list;
    }
  }, {
    key: "without",
    value: function without() {
      var _this$fieldsToExclude;

      (_this$fieldsToExclude = this.fieldsToExclude).push.apply(_this$fieldsToExclude, arguments);

      return this;
    }
  }, {
    key: "fieldsToBuild",
    get: function get() {
      var _this2 = this;

      return Array.from(this.values.keys()).filter(function (f) {
        return _this2.isNotExcluded(f);
      });
    }
  }]);

  return ObjectBuilderBase;
}();
var ObjectBuilder = /*#__PURE__*/function (_ObjectBuilderBase) {
  inherits(ObjectBuilder, _ObjectBuilderBase);

  var _super = _createSuper(ObjectBuilder);

  function ObjectBuilder() {
    classCallCheck(this, ObjectBuilder);

    return _super.apply(this, arguments);
  }

  return ObjectBuilder;
}(ObjectBuilderBase);

export { ObjectBuilder };
//# sourceMappingURL=ts-object-builder.mjs.map
