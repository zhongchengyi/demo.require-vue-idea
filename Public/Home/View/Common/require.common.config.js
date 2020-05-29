;(function () {
    // let rev = 1;
    let rev = new Date().getTime();

    require.config({
        paths: {
            'm1.class2': '../../../../Public/Home/View/moduleA/Class2',
        }
    })

    // noinspection SpellCheckingInspection
    let cfg = {
        // 不设置超时 = 0
        waitSeconds: 60,
        map: {
            '*': {
                'css': '../../../../Common/Common/require-css/css'
            }
        },
        paths: {
            'vue': '../../../../Common/Common/vue/dist/vue.min',
            'vue-loaders': '../../../../Common/Common/vue-loaders-3.3/dist/vue-loaders.umd.min',
            'vue-router': '../../../../Common/Common/vue-router@3.1.3/dist/vue-router.min',
            'vuex': '../../../../Common/Common/vuex@3.1.1/dist/vuex.min',

            'm1.class2': '../../../../Public/Home/View/moduleA/Class2',
            'm1.class3': '../../../../Public/Home/View/moduleA/Class3',

            'Public': '../../../../Public',
            'Common': '../../../../Common',
            'ModuleA': '../../../../Public/Home/View/moduleA',
            'root': '../../../../..',

        },
        shim: {
            'waves': ['css!waves'],
            'vue-router': ['vue'],
            'vue-loaders': ['css!../../../../Common/Common/vue-loaders-3.3/dist/vue-loaders.min'],

        },
        onNodeCreated: function (node, config, moduleName, url) {
            if (!this.nodes) {
                this.nodes = {};
            }
            if (!this.nodes[node.src]) {
                this.nodes[node.src] = {node, moduleName, url};
            } else {
                console.warn('重复的模块，如下:');
                console.log(this.nodes[node.src]);
                console.log({node, moduleName, url});
            }
        },
        urlArgs: function (id, url) {
            if (url.indexOf('http') === 0) {
                return '';
            }
            let args = `rev=${rev}`;
            // /Common/Common 下的文件不用版本控制, 都是 3 方库
            if (url.indexOf('/Common/Common/') >= 0
                && url.indexOf('/Common/Common/self/') < 0
            ) {
                args = 'v=2'
            }
            return (url.indexOf('?') === -1 ? '?' : '&') + args;
        }
    };

    let dataMain = '';
    let scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i > -1; i -= 1) {
        let script = scripts[i];
        let src = script.getAttribute('src');
        if (src.indexOf('require.common.config.js') > 0) {
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                let mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one,
                //but only do so if the data-main value is not a loader plugin
                //module ID.
                if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    let subPath = src.length ? src.join('/') + '/' : './';

                    cfg.baseUrl = subPath;
                }
            }
            break;
        }
    }

    // 配置参数
    require.config(cfg);


    if (dataMain) {
        require([dataMain]);
    }
}());