var util = require('util');

exports.isNullOrUndefined = function (b) {
    return b === undefined || b === null;
};

exports.isBoolean = function (b) {
    return typeof b === 'boolean' || b instanceof Boolean;
};

exports.isNumber = function (b) {
    return typeof b === 'number' || b instanceof Number;
};

exports.isString = function (b) {
    return typeof b === 'string' || b instanceof String;
};

exports.isFunction = function (b) {
    return typeof b === 'function';
};

exports.isError = function (b) {
    return b instanceof Error;
};

exports.isArray = util.isArray;
exports.isDate = util.isDate;
exports.isError = util.isError;
exports.isRegExp = util.isRegExp;
exports.isNaN = isNaN;
