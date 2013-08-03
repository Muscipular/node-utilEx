var extend = require('./extend').extend;
var args2Array = require('./arrayHelper').args2Array;

var inheritEx = function (childClass, baseClass) {
    if (childClass === baseClass) {
        throw new Error('Can not inherits class self.');
    }
    var base = function (optClass) {
        var self = this;
        if (!hasOwnProperty(self, '_baseStack_')) {
            Object.defineProperty(self, "_baseStack_", {
                value: [],
                writable: false,
                enumerable: false,
                configurable: false
            });
        }
        var currentBase = null;
        if (optClass && typeof optClass === 'function') {
            if (optClass !== baseClass) {
                if (!base.hasOwnProperty('base')) {
                    throw new Error("can't found the base class");
                }
                self._baseStack_.push(base.base);
                var tmp = base.base.call(self, optClass);
                self._baseStack_.pop();
                return tmp;
            }
        }
        var lastBaseIndex = (self._baseStack_.length - 1);
        if (lastBaseIndex >= 0) {
            currentBase = self._baseStack_[lastBaseIndex];
        } else {
            currentBase = self.base;
        }
        if (currentBase !== base && typeof currentBase === 'function') {
            return currentBase.call(self);
        }
        var getBaseObject = function () {
            var bind = function (fn) {
                return function () {
                    self._baseStack_.push(currentBase.base);
                    fn.apply(self, args2Array(arguments));
                    self._baseStack_.pop();
                }
            };
            var p = null, fn = null, _base_ = bind(baseClass);
            for (p in baseClass.prototype) {
                if (typeof (fn = baseClass.prototype[p]) === 'function') {
                    _base_[p] = fn.bind(self); //bind(fn);
                } else {
                    _base_[p] = fn;
                }
            }
            return _base_;
        };
        return getBaseObject();
    };
    if (baseClass.prototype.hasOwnProperty('base')) {
        base.base = baseClass.prototype.base;
    }
    childClass.base = baseClass;
    var bindTop = function (childClass) {
        var p = null;
        var bind = function (fn) {
            return function () {
                if (!hasOwnProperty(this, '_baseStack_')) {
                    Object.defineProperty(this, "_baseStack_", {
                        value: [],
                        writable: false,
                        enumerable: false,
                        configurable: false
                    });
                }
                this._baseStack_.push(childClass.prototype.base);
                var result = fn.apply(this, args2Array(arguments));
                this._baseStack_.pop();
                return result;
            }
        };
        for (p in childClass.prototype) {
            if (typeof (fn = childClass.prototype[p]) === 'function' && p != 'base') {
                childClass.prototype[p] = bind(fn);
            } else {
                childClass.prototype[p] = fn;
            }
        }
    };
    bindTop(childClass);
    childClass.prototype = extend({}, baseClass.prototype, childClass.prototype);
    childClass.prototype.__proto__ = baseClass.prototype;
    Object.defineProperty(childClass.prototype, "base", {
        value: base,
        writable: false,
        enumerable: false,
        configurable: false
    });
//    childClass.prototype.hasOwnProperty = function (propertyName) {
//        switch (propertyName) {
//            case  '_baseStack_':
//            case  'propertyIsEnumerable':
//            case  'hasOwnProperty':
//                return false;
//        }
//        return hasOwnProperty(this, propertyName);
//    };
//    childClass.prototype.propertyIsEnumerable = function (propertyName) {
//        switch (propertyName) {
//            case  '_baseStack_':
//            case  'propertyIsEnumerable':
//            case  'hasOwnProperty':
//                return false;
//        }
//        return propertyIsEnumerable(this, propertyName);
//    };
    return childClass;
};

var hasOwnProperty = function (obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

var propertyIsEnumerable = function (obj, property) {
    return Object.prototype.propertyIsEnumerable.call(obj, property);
};

module.exports = {
    inheritEx: inheritEx,
    hasOwnProperty: hasOwnProperty,
    propertyIsEnumerable: propertyIsEnumerable
};