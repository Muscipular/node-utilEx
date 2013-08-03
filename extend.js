var typeChecker = require('./typeChecker');

var extend = function (target, source) {
    var overWrite, i, m;
    if (arguments.length == 2) {
        overWrite = true;
    } else if (arguments.length > 2) {
        overWrite = ((!typeChecker.isBoolean(overWrite = arguments[arguments.length - 1])) || (overWrite));
    } else {
        return target;
    }
    m = arguments.length - (overWrite && typeChecker.isBoolean(arguments[arguments.length - 1]) ? 2 : 1);
    for (i = 1; i <= m; i++) {
        source = arguments[i];
        if (i == m && m > 2 && typeChecker.isBoolean(source)) {
            break;
        }
        for (var field in source) {
            if (overWrite || !(field in target)) {
                target[field] = source[field];
            }
        }
    }
    return target;
};


var extendSafe = function (target, source) {
    var overWrite, i, m;
    if (arguments.length == 2) {
        overWrite = true;
    } else if (arguments.length > 2) {
        overWrite = ((!typeChecker.isBoolean(overWrite = arguments[arguments.length - 1])) || (overWrite));
    } else {
        return target;
    }
    m = arguments.length - (overWrite && typeChecker.isBoolean(arguments[arguments.length - 1]) ? 2 : 1);
    for (i = 1; i <= m; i++) {
        source = arguments[i];
        if (i == m && m > 2 && typeChecker.isBoolean(source)) {
            break;
        }
        for (var field in source) {
            if (source.hasOwnProperty(field) && source.propertyIsEnumerable(field) && overWrite || !(field in target)) {
                target[field] = source[field];
            }
        }
    }
    return target;
};


module.exports.extend = extend;
module.exports.extendSafe = extendSafe;