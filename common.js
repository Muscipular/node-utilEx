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

exports.dateFormat = function (date, mask) {
    var fillZero = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };
    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd':
                return date.getDate();
            case 'dd':
                return fillZero(date.getDate());
            case 'ddd':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
            case 'dddd':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
            case 'M':
                return date.getMonth() + 1;
            case 'MM':
                return fillZero(date.getMonth() + 1);
            case 'MMM':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
            case 'MMMM':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
            case 'yy':
                return String(date.getFullYear()).substr(2);
            case 'yyyy':
                return date.getFullYear();
            case 'h':
                return date.getHours() % 12 || 12;
            case 'hh':
                return fillZero(date.getHours() % 12 || 12);
            case 'H':
                return date.getHours();
            case 'HH':
                return fillZero(date.getHours());
            case 'm':
                return date.getMinutes();
            case 'mm':
                return fillZero(date.getMinutes());
            case 's':
                return date.getSeconds();
            case 'ss':
                return fillZero(date.getSeconds());
            case 'l':
                return fillZero(date.getMilliseconds(), 3);
            case 'L':
                var m = date.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                else m = 0;
                return fillZero(m);
            case 'tt':
                return date.getHours() < 12 ? 'am' : 'pm';
            case 'TT':
                return date.getHours() < 12 ? 'AM' : 'PM';
            case 'Z':
                return date.toUTCString().match(/[A-Z]+$/);
            // Return quoted strings with the surrounding quotes removed
            default:
                return $0.substr(1, $0.length - 2);
        }
    });
};