;(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory();
    } else {
        // Global
        window.SchoolAddressType = factory();
    }
}(function () {
    /**
     * @exports
     */
    class umd1 {
        static a() {

        }
    }

    return umd1;
}));