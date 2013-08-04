var forEach = function (array, fn, thisArg) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (thisArg) {
            fn.call(thisArg, array[i], i);
        } else {
            fn(array[i], i);
        }
    }
};

var joinEx = function (array, separator) {
    var s = '', v = null;
    separator = separator === undefined || separator === null ? '' : separator;
    var len = array.length;
    if (len > 10000) {
        return array.join(separator);
    }
    for (var i = 0, len2 = len - 1; i < len; i++) {
        v = array[i];
        s += v === undefined || v === null ? '' : v;
        if (i != len2) s += separator;
    }
    return s;
};

var args2Array = function (args, start, end) {
    return Array.prototype.slice.call(args, start, end);
};

var findItem = function (array, field, expression, binaryFind, desc) {
    var canBinaryFind = false;
    if (!array || array.length == 0) {
        return null;
    }

    if (typeof expression !== 'function') {
        expression = (function (value) {
            return function (obj) {
                return obj && obj[field] == value;
            }
        })(expression);
    }

    if (binaryFind) {
        canBinaryFind = expression(array[0], array[0][field]);
        canBinaryFind = typeof canBinaryFind === 'number' || canBinaryFind instanceof Number;
    }

    var _binaryFind = function (start, end) {
        if (start > end) {
            return null;
        }
        var m = (start + end) >> 1;
        var r = expression(array[m], array[m][field]);
        if (r < 0) {
            return desc ? _binaryFind(start, m - 1) : _binaryFind(m + 1, end);
        } else if (r > 0) {
            return desc ? _binaryFind(m + 1, end) : _binaryFind(start, m - 1);
        }
        return array[m];
    };

    if (binaryFind && canBinaryFind) {
        return _binaryFind(0, array.length - 1);
    }

    for (var i = array.length - 1, item; i >= 0; i--) {
        if ((item = array[i]) && expression(item, item[field])) {
            return item;
        }
    }
    return null;
};

exports.forEach = forEach;
exports.joinEx = joinEx;
exports.args2Array = args2Array;
exports.findItem = findItem;
