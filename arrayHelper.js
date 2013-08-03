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

exports.forEach = forEach;
exports.joinEx = joinEx;
exports.args2Array = args2Array;