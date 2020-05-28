;(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['vue', 'jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('vue'), require('jquery'));
    } else {
        // Global
        factory(Vue, jQuery);
    }
}(function (Vue, $) {
    /**
     *备份被 vue 忽略的标签
     * @param target
     */
    function backupVueForbiddenTags(target) {
        $('body').append($(target).find('style'));
        $('body').append($(target).find('script').not('[type]'));
        $('body').append($(target).find('script[type="text/javascript"]'))
    }

    Vue.mixin({
        created: function () {
            /**
             * 开关，默认打开
             */
            if (!this.$options.notBackupForbiddenTags) {
                backupVueForbiddenTags(this.$options.el);
            }
        }
    })
}));
