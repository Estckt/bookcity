define(['jquery', 'get', 'table', 'base64', 'temp'], function($, get, table, base64, temp) {
    var html = "<h3>{{t}}</h3>{{#each p}}<p>{{this}}</p>{{/each}}";
    var storage = window.localStorage;

    function getRead(url, cb) {
        var script = document.createElement('script');
        window['duokan_fiction_chapter'] = function(data) {
            cb(JSON.parse($.base64().decode(data)));
            document.head.removeChild(script)
        }
        script.src = url;
        document.head.append(script)
    }

    function render(bookid, cur, sum) {
        $('.b-top span').html(cur + '/' + sum);
        storage.setItem('curChar', cur)
        get('/api/read?bookid=' + bookid + '&char=' + cur, function(data) {
            if (data) {
                var data = JSON.parse(data);
                getRead(data.jsonp, function(data) {
                    temp(html, data, '.read>.text');
                    // $('.text').on('click', function() {
                    //     $('.nav').show();
                    // });
                });
            } else {
                temp('暂无数据', {}, '.read>.text');
            }
        });
    }
    return function(info) {
        table.page($('.read'));
        var cur = info.char;
        var sum = info.sumChar;
        var bookid = info.bookid;
        render(bookid, cur, sum);
        $('.next').on('click', function() {
            cur++;
            cur = cur > sum ? sum : cur;
            render(bookid, cur, sum);
        });
        $('.prev').on('click', function() {
            cur--;
            cur = cur <= 1 ? 1 : cur;
            render(bookid, cur, sum);
        });
        $('.menu').on('click', function() {
            location.href = "/page/menu/" + bookid;
        });
        $('.text').on('click', function() {
            $('.nav').show();
            $('.nav').on('click', function() {
                $('.nav').hide();
            })
        })

    };
});