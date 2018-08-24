define(['jquery', 'table', 'get', 'temp'], function($, table, get, temp) {
    return function(info) {
        var storage = localStorage;
        table.page('.mulu')
        var html = '{{#each toc}}<li>{{title}}{{#unless price}}<span>免费</span>{{/unless}}</li>{{/each}}';
        get(info.url, function(data) {
            var data = JSON.parse(data);
            temp(html, data.item, '.mulu .menu-list');
            var cur = storage.getItem('curChar');
            $('.menu-list li').eq(cur).addClass('active')
        });
        $('.menu-list').on('click', 'li', function() {
            localStorage.setItem('curChar', $(this).index());
            location.href = '/page/read/' + info.bookid;
        })
    }
})