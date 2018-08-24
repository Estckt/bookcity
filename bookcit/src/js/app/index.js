define(['jquery', 'apphome', 'get'], function($, apphome, get) {
    // var cache = {}; 
    // function get(url, callback) {
    //     if (cache[url]) {
    //         callback(cache[url]);
    //         return;
    //     };
    //     $.ajax({
    //         url: url,
    //         dataType: 'text',
    //         success: function(data) {
    //             cache[url] = data;
    //             callback(data);
    //         }

    //     });
    // };
    var init = {};
    init.start = function(ctx, next) {
        ctx.data = {}
        next();
    };
    console.log(init)
    init.bookcity = function(ctx, next) {
        get('/views/bookcity.html', function(html) {
            ctx.data.index = 0;
            ctx.data.url = '/api/bookcity';
            ctx.data.script = 'bookcity';
            ctx.data.content = html;
            next();
        });
    };
    init.bookshelf = function(ctx, next) {

        get('/views/bookshelf.html', function(html) {
            ctx.data.index = 1;
            ctx.data.url = '/api/bookshelf';
            ctx.data.script = 'bookshelf'; //js文件名
            ctx.data.content = html;
            next();
        });
    };
    init.detail = function(ctx, next) {
        get('/views/detail.html', function(html) {
            ctx.data.url = '/api/detail?id=' + ctx.params.pageid;
            ctx.data.bookid = ctx.params.pageid;
            ctx.data.script = 'detail';
            ctx.data.content = html;
            next();
        });
    };
    init.read = function(ctx, next) {
        var storage = window.localStorage;
        get('/api/chapter?bookid=' + ctx.params.pageid, function(data) {
            var data = JSON.parse(data);
            ctx.data.char = storage.getItem('curChar') || 1;
            ctx.data.script = 'read';
            ctx.data.sumChar = data.item.toc.length;
            ctx.data.bookid = ctx.params.pageid;
            next();
        })
    };
    init.menu = function(ctx, next) {
        ctx.data.url = '/api/chapter?bookid=' + ctx.params.pageid;
        ctx.data.bookid = ctx.params.pageid;
        ctx.data.script = 'menu';
        next();
    };

    init.render = function(ctx) {
        console.log(ctx)
        require([ctx.data.script], function(cb) {
            cb(ctx.data);
        });
    };

    return init;

});