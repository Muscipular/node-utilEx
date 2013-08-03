var util = require('../index.js');
var Classes = require('./testCode');
var ClassA = Classes.ClassA;
var ClassB = Classes.ClassB;
var ClassC = Classes.ClassC;
var ClassD = Classes.ClassD;
var ClassE = Classes.ClassE;
var ClassF = Classes.ClassF;

exports["Single Level"] = {
    "ctor test": function (test) {
        var value = 1, value2 = 2, value3 = 3;
        var b = new ClassB(value, value2, value3);
        var ctorStack = b.__ctorStack__;
//        console.log(ctorStack);
        test.deepEqual(ctorStack, ['ClassA', 'ClassB']);
//        console.log(JSON.stringify(b));
        test.equal(b.value, value + 1);
        test.equal(b.value2, value2);
        test.equal(b.value3, value3);
        test.done();
    },
    "call function": function (test) {
        var value = 1, value2 = 2, value3 = 3;
        var b = new ClassB(value, value2, value3);
        var result = b.func1();
        test.equal(result.funcName, "ClassB.func1");
        test.equal(result.value["this.value"], b.value);
        test.equal(result.value["this.base.value"], undefined);  //can't access base.value, use this.value instead
        test.equal(result.value["this.base.func1"].funcName, "ClassA.func1");
        test.equal(result.value["this.base.func1"].value["this.value"], b.value);
        result = b.base().func1();
        test.equal(result.funcName, "ClassA.func1");
        test.equal(result.value["this.value"], b.value);
        result = b.func3();
        test.equal(result.funcName, "ClassB.func3");
        test.equal(result.value["this.value3"], b.value3);
        result = b.base(ClassA).func1();
        test.equal(result.funcName, "ClassA.func1");
        test.equal(result.value["this.value"], b.value);
        test.done();
    },
    "call static value": function (test) {
        var value = 1, value2 = 2, value3 = 3;
        var b = new ClassB(value, value2, value3);
        test.equal(b.ClassValueOverride, ClassB.prototype.ClassValueOverride);
        test.equal(b.ClassValueA, ClassB.prototype.ClassValueA);
        test.equal(b.ClassValueB, ClassB.prototype.ClassValueB);
        test.equal(b.base().ClassValueOverride, ClassA.prototype.ClassValueOverride);
        test.equal(b.ClassValueOverride, ClassB.prototype.ClassValueOverride);
        test.done();
    }
};


exports["Multi Level"] = {
    "ctor test": function (test) {
        var value = 1, value2 = 2, value3 = 3;
        var b = new ClassC(value, value2, value3);
        test.deepEqual(b.__ctorStack__, ['ClassA', 'ClassB', 'ClassC']);
        b = new ClassD(value, value2, value3);
        test.deepEqual(b.__ctorStack__, ['ClassA', 'ClassB', 'ClassC', 'ClassD']);
        b = new ClassE(value, value2, value3);
        test.deepEqual(b.__ctorStack__, ['ClassA', 'ClassB', 'ClassC', 'ClassD', 'ClassE']);
        b = new ClassF(value, value2, value3);
//        b.__ctorStack__.toString()
        test.deepEqual(b.__ctorStack__, ['ClassA', 'ClassB', 'ClassF']);
        test.notDeepEqual(b.__ctorStack__, ['ClassA', 'ClassB', 'ClassC', 'ClassD', 'ClassE', 'ClassF']);
        test.done();
    },
    "call function": function (test) {
        var value = 1, value2 = 2, value3 = 3;
        var f = new ClassF(value, value2, value3);
        var sayHello = f.sayHello();
        test.equal(sayHello.funcName, 'ClassF.sayHello');
        test.equal(sayHello
            .value["this.base.ClassE.sayHello"].funcName, 'ClassE.sayHello');
        test.equal(sayHello
            .value["this.base.ClassE.sayHello"]
            .value['this.base.sayHello'].funcName, 'ClassC.sayHello');
        test.equal(sayHello
            .value["this.base.ClassE.sayHello"]
            .value['this.base.sayHello']
            .value['this.base.sayHello'].funcName, 'ClassB.sayHello');
        test.equal(sayHello
            .value["this.base.ClassE.sayHello"]
            .value['this.base.sayHello']
            .value['this.base.sayHello']
            .value['this.base.sayHello'].funcName, 'ClassA.sayHello');
        sayHello = f.sayHello2();
        test.equal(sayHello.funcName, 'ClassF.sayHello2');
        test.equal(sayHello
            .value["this.base.ClassA.sayHello"].funcName, 'ClassA.sayHello');
        sayHello = f.sayHello3();
        test.equal(sayHello.funcName, 'ClassF.sayHello3');
        test.equal(sayHello
            .value["this.base.ClassB.sayHello"].funcName, 'ClassB.sayHello');
        test.equal(sayHello
            .value["this.base.ClassB.sayHello"]
            .value['this.base.sayHello'].funcName, 'ClassA.sayHello');
        test.equal(sayHello
            .value["this.base.ClassB.sayHello"]
            .value["this.base.sayHello"]
            .value['this.funcVA'].funcName, 'ClassB.funcVA');
        test.done();
    },
    "call static value": function (test) {
        var value = 1, value2 = 2, value3 = 3;
        var b = new ClassF(value, value2, value3);
        test.equal(b.ClassValueOverride, ClassF.prototype.ClassValueOverride);
        test.equal(b.ClassValueA, ClassB.prototype.ClassValueA);
        test.equal(b.ClassValueB, ClassB.prototype.ClassValueB);
        test.equal(b.base().ClassValueOverride, ClassE.prototype.ClassValueOverride);
        test.equal(b.base(ClassB).ClassValueOverride, ClassB.prototype.ClassValueOverride);
        test.done();
    },
    "test with args": function (test) {
        var T = function () {
        };
        T.prototype = {
            add: function (a, b) {
                return a + b;
            },
            addByOne: function (a) {
                return a + 1;
            },
            minute: function (a, b) {
                return a + b;
            }
        };
        var T2 = function () {
        };
        T2.prototype = {
            add: function (a) {
                return this.base().add(a, 10);
            },
            addByOne: function (a) {
                return this.base().addByOne(a) * 10;
            },
            minute: function (a, b) {
                return a - b;
            }
        };
        var T3 = function () {
        };
        T3.prototype = {
            add: function (a) {
                return this.base().add(a + 10);
            }
        };
        var T4 = function () {
        };
        T4.prototype = {
            minute: function (a, b) {
                return this.base(T).minute(a, -b);
            }
        };
        util.inheritEx(T2, T);
        util.inheritEx(T3, T2);
        util.inheritEx(T4, T3);

        var t = new T();
        var t2 = new T2();
        var t3 = new T3();
        var t4 = new T4();
        test.equal(t.add(1, 2), 3);
        test.equal(t.addByOne(1), 2);
        test.equal(t.minute(1, 2), 3);
        test.equal(t2.add(1), 11);
        test.equal(t2.addByOne(1), 20);
        test.equal(t2.minute(1, 2), -1);
        test.equal(t3.add(1), 21);
        test.equal(t3.addByOne(1), 20);
        test.equal(t3.minute(1, 2), -1);
        test.equal(t4.add(1), 21);
        test.equal(t4.addByOne(1), 20);
        test.equal(t4.minute(30, 3), 27);
        test.done();
    }
};