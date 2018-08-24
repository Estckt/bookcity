define(['jquery', 'table', 'get', 'temp'], function($, table, get, temp) {

    function gethtml(url) {
        var str = '';
        get(url, function(html) {
            str = html;
        });
        return str;
    }

    function change(html, data, parent) {
        $(parent).parent().find('.hyh').on('click', function() {
            var n = +$(this).attr('data-page');
            n++;
            var len = data.length;
            var pagesize = Math.ceil(len / 5);
            n = n % pagesize;
            $(this).attr('data-page', n)
            temp(html, data.slice(n * 5, n * 5 + 5), parent)
        })
    }

    function scrollload(pagenum, imghtml) {
        pagenum++;
        if (pagenum >= 4) {
            $('.loading').html('已经到底了')
            return false;
        }
        var clientHeight = $('.main').height();
        var loadHeight = $('.loading').height();
        $('.main').on('scroll', function() {
            var contHeight = $(this).children().height() - loadHeight;
            if (clientHeight + $(this).scrollTop() > contHeight) {
                $(this).off('scroll');
                get('/api/bookcityload?pagenum=' + pagenum, function(data) {
                    var data = JSON.parse(data);
                    temp(imghtml, data.items, '.cont-load', 'scroll');
                    scrollload(pagenum, imghtml)
                })
            }

        })
    }
    return function(info) {
        table.page('.index')
        table.tab({
            parent: '.header',
            tag: 'a',
            index: info.index,
        })
        $('.main').html(info.content);
        get(info.url, function(data) {
            var data = JSON.parse(data);
            temp(info.content, data.items[0], '.main');
            new Swiper('.banner', {
                autoplay: true
            });
            //本周最火 
            var bzhtml = gethtml('/views/bzzh.html')
            temp(bzhtml, data.items[1].data, '.cont-of>div');
            //重磅推荐
            var zbtjhtml = data.items[2].data.data;
            var zbhtml = gethtml('/views/zbtj.html');
            temp(zbhtml, zbtjhtml.slice(0, 5), '.cont-zb>div');
            change(zbhtml, zbtjhtml, '.cont-zb>div');
            //女生最爱
            var nvtjhtml = data.items[3].data.data;
            var nvhtml = gethtml('/views/nv.html');
            temp(nvhtml, nvtjhtml.slice(0, 5), '.cont-nv>div');
            change(nvhtml, nvtjhtml, '.cont-nv>div');
            //男生最爱
            var nstjhtml = data.items[4].data.data;
            var nshtml = gethtml('/views/ns.html');
            temp(nshtml, nstjhtml.slice(0, 5), '.cont-ns>div');
            change(nshtml, nstjhtml, '.cont-ns>div');
            //限时免费 
            var xmhtml = gethtml('/views/xm.html')
            temp(xmhtml, data.items[5].data.data, '.cont-xm>div');
            // 精选专题
            var jxhtml = gethtml('/views/jx.html');
            temp(jxhtml, data.items[6].data.data, '.cont-jx>div')
                //上拉加载
            var pagenum = 0;
            var imghtml = gethtml('/views/imginfo.html');
            scrollload(pagenum, imghtml)
        })

    };
});