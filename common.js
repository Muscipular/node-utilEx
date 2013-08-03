exports.parseInt = function (value, defaultValue, radix) {
    value = parseInt(value, radix);
    if (isNaN(value)) {
        return defaultValue;
    }
    return value;
};

exports.parseFloat = function (value, defaultValue, radix) {
    value = parseFloat(value, radix);
    if (isNaN(value)) {
        return defaultValue;
    }
    return value;
};