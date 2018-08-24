define(['jquery', 'table'], function($, table) {
    return function(info) {
        console.log(info)
        table.tab({
            parent: '.header',
            tag: 'a',
            index: info.index,
        })
        $('.main').html(info.content)

    };
});