define(['jquery'], function($) {
    var data = {};
    data.tab = function(obj) {
        var ops = $.extend({}, {
            tag: 'span',
            className: 'active'
        }, obj);
        change(ops.index);
        $(ops.parent).find(ops.tag).on('click', function() {
            change($(this).index())
        });

        function change() {
            $(ops.parent).find(ops.tag).eq(ops.index).addClass(ops.className).siblings().removeClass(ops.className);
        };
    }
    data.page = function(el) {
        $('.wrap').children().hide();
        $(el).show()
    }
    return data;

});