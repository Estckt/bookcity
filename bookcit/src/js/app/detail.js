define(['jquery', 'get', 'temp', 'table'], function($, get, temp, table) {
    return function(info) {
        table.page('.detail');
        get(info.url, function(data) {
            console.log(info.url)
            var data = data ? JSON.parse(data) : { item: { title: '暂无数据' } }
            temp(info.content, data.item, '.detail')
                // get('/views/detail.html', function(html) {
                //     temp(html, data, '.detail')
                // })  
            if (data.item.title === "暂无数据") {
                temp('  <a href="javascript:history.back()"><span class="top_back icon iconfont icon-back"></span></a><p">暂无数据</p>', {}, '.detail')
            } else {
                get('/views/de.html', function(html) {
                    temp(html, data.item, '.detail>.main')
                });
            };

        });
        $('.late').on('click', function() {
            location.href = '/page/menu' + info.bookid + '?last=true';
        });
    };

});