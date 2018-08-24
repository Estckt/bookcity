require.config({
    baseUrl: './bookcity/bookcit/src/js/',
    paths: {
        //插件
        jquery: './libs/jquery',
        handle: './libs/handlebars.min',
        page: './libs/page',
        base64: './libs/jquerybase64',
        //页面
        apindex: './app/index',
        bookcity: './app/bookcity', //书城
        bookshelf: './app/bookshelf', //书架 
        detail: './app/detail', //详情页
        read: './app/read', //章节
        menu: './app/menu', //目录
        search: './app/search', //搜索
        //路由接口
        te: './route/index',
        apphome: './app/home',
        //公用方法
        table: './common/tab',
        get: './common/get',
        temp: './common/template',

    },
    shim: {
        base64: {
            exports: 'base64',
            deps: ['jquery']
        }
    }
})
require(['te'])
