define(['Class1', 'm1.class2', 'm1.class3', 'umd1', 'obj1', 'm1.obj2'],
    /**
     * @param {@module module:n1/Class3} Class3
     * @param {n1.obj2} obj2
     */
    function (c1, m1c2, Class3, umd1, obj1, obj2) {
        Class3.a();
        Class3.ia();
        let c3 = new Class3();
        c3.ia();
        obj2.a();
    });
//
// Class3.b.a();
// Class3.a();
// let c = new Class3();
// c.ia();
// // obj1.a();
// // c1.a();
// // m1c2.a();
// // let a1 = new c1();
// // umd1.u1
// // obj1.a();