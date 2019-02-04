var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ObjectBuilderBase = /** @class */ (function () {
    function ObjectBuilderBase(createType) {
        this.createType = createType;
        this.values = new Map();
        this.fieldsToExclude = [];
    }
    Object.defineProperty(ObjectBuilderBase.prototype, "fieldsToBuild", {
        get: function () {
            var _this = this;
            return Array.from(this.values.keys()).filter(function (f) { return _this.isNotExcluded(f); });
        },
        enumerable: true,
        configurable: true
    });
    ObjectBuilderBase.prototype.isNotExcluded = function (field) {
        return this.fieldsToExclude.indexOf(field) === -1;
    };
    ObjectBuilderBase.prototype.buildForIndex = function (index) {
        var _this = this;
        if (index === void 0) { index = 0; }
        var obj = this.createNewObject();
        this.fieldsToBuild.forEach(function (k) {
            obj[k] = _this.values.get(k)(index);
        });
        return obj;
    };
    ObjectBuilderBase.prototype.createNewObject = function () {
        return new this.createType();
    };
    ObjectBuilderBase.prototype.with = function (name, value) {
        if (typeof value === 'function') {
            this.values.set(name, value);
        }
        else {
            this.values.set(name, function () { return value; });
        }
        return this;
    };
    ObjectBuilderBase.prototype.build = function () {
        return this.buildForIndex(0);
    };
    ObjectBuilderBase.prototype.buildList = function (count) {
        var list = [];
        for (var i = 0; i < count; i++) {
            list.push(this.buildForIndex(i));
        }
        return list;
    };
    ObjectBuilderBase.prototype.without = function () {
        var fieldsToExclude = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fieldsToExclude[_i] = arguments[_i];
        }
        (_a = this.fieldsToExclude).push.apply(_a, fieldsToExclude);
        return this;
        var _a;
    };
    return ObjectBuilderBase;
}());
export { ObjectBuilderBase };
var ObjectBuilder = /** @class */ (function (_super) {
    __extends(ObjectBuilder, _super);
    function ObjectBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ObjectBuilder;
}(ObjectBuilderBase));
export { ObjectBuilder };
