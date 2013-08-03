var utilEx = require('../index.js');

var ClassA = function (v, b) {
    this.__ctorStack__ = [].concat(this.__ctorStack__ || [], ['ClassA']);
    this.value = v;
    this.value2 = b;
};

ClassA.prototype = {
    func1: function () {
        return {
            funcName: "ClassA.func1",
            value: {"this.value": this.value}
        };
    },
    func2: function () {
        return {
            funcName: "ClassA.func2",
            value: {"this.value2": this.value2}
        };
    },
    funcVA: function () {
        return {
            funcName: "ClassA.funcVA",
            value: {
                "this.ClassValueA": this.ClassValueA,
                "this.ClassValueOverride": this.ClassValueOverride
            }
        };
    },
    sayHello: function () {
        return {
            funcName: "ClassA.sayHello",
            value: {
                "this.funcVA": this.funcVA()
            }
        };
    },
    ClassValueA: 'AA',
    ClassValueOverride: "AA",
    Class: "ClassA"
};

var ClassB = function (v, b, n) {
    this.base()(v, b, n);
    this.__ctorStack__ = [].concat(this.__ctorStack__ || [], ['ClassB']);

    this.value = v + 1;
    this.value3 = n;
};

ClassB.prototype = {
    func1: function () {
        return {
            funcName: "ClassB.func1",
            value: {
                "this.base.func1": this.base().func1(),
                "this.value": this.value,
                "this.base.value": this.base().value
            }
        };
    },
    func2: function () {
        return {
            funcName: "ClassB.func2",
            value: {
                "this.base.func2": this.base().func2(),
                "this.value2": this.value2,
                "this.base.value2": this.base().value2
            }
        };
    },
    func3: function () {
        return {
            funcName: "ClassB.func3",
            value: {
                "this.value3": this.value3
            }
        };
    },
    funcVA: function () {
        return {
            funcName: "ClassB.funcVA",
            value: {
                "this.value3": this.value3,
                "this.base.funcVA": this.base().funcVA(),
                "this.ClassValueA": this.ClassValueA,
                "this.ClassValueB": this.ClassValueB,
                "this.ClassValueOverride": this.ClassValueOverride,
                "this.base().ClassValueOverride": this.base().ClassValueOverride,
                "this.base(ClassA).ClassValueOverride": this.base(ClassA).ClassValueOverride
            }
        };
    },
    sayHello: function () {
        return {
            funcName: "ClassB.sayHello",
            value: {
                "this.base.sayHello": this.base().sayHello()
            }
        };
    },
    ClassValueB: 'BB',
    ClassValueOverride: "AABB",
    Class: "ClassB"
};

var ClassC = function () {
    this.base()(1, 2, 3);
    this.__ctorStack__ = [].concat(this.__ctorStack__ || [], ['ClassC']);
};

ClassC.prototype = {
    sayHello: function () {
        return {
            funcName: "ClassC.sayHello",
            value: {
                "this.base.sayHello": this.base().sayHello()
            }
        };
    },
    func3: function () {
        return {
            funcName: "ClassC.func3",
            value: {
                "this.value3": this.value3
            }
        };
    },
    ClassValueOverride: "AABBCC",
    Class: "ClassC"
}
;

var ClassD = function () {
    this.base()();
    this.__ctorStack__ = [].concat(this.__ctorStack__ || [], ['ClassD']);
};

ClassD.prototype = {
    ClassValueOverride: "AABBCCDD",
    Class: "ClassD"
};

var ClassE = function () {
    this.base()();
    this.__ctorStack__ = [].concat(this.__ctorStack__ || [], ['ClassE']);
};

ClassE.prototype = {
    sayHello: function () {
        return {
            funcName: "ClassE.sayHello",
            value: {
                "this.base.sayHello": this.base().sayHello()
            }
        };
    },
    ClassValueOverride: "AABBCCDDEE",
    Class: "ClassE"
};

var ClassF = function () {
    this.base(ClassB)(9, 9, 9);
    this.__ctorStack__ = [].concat(this.__ctorStack__ || [], ['ClassF']);
};

ClassF.prototype = {
    sayHello: function () {
        return {
            funcName: "ClassF.sayHello",
            value: {
                "this.base.ClassE.sayHello": this.base(ClassE).sayHello()
            }
        };
    },
    sayHello2: function () {
        return {
            funcName: "ClassF.sayHello2",
            value: {
                "this.base.ClassA.sayHello": this.base(ClassA).sayHello()
            }
        };
    },
    sayHello3: function () {
        return {
            funcName: "ClassF.sayHello3",
            value: {
                "this.base.ClassB.sayHello": this.base(ClassB).sayHello()
            }
        };
    },
    ClassValueOverride: "AABBCCDDEEFF",
    Class: "ClassF"
};

utilEx.inheritEx(ClassB, ClassA);
utilEx.inheritEx(ClassC, ClassB);
utilEx.inheritEx(ClassD, ClassC);
utilEx.inheritEx(ClassE, ClassD);
utilEx.inheritEx(ClassF, ClassE);

exports.ClassA = ClassA;
exports.ClassB = ClassB;
exports.ClassC = ClassC;
exports.ClassD = ClassD;
exports.ClassE = ClassE;
exports.ClassF = ClassF;
