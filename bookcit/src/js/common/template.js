define(['jquery', 'handle'], function($, handle) {
    handle.registerHelper('num', function(item) {
        return item == 0 ? 1 : '0' + (item + 1)
    })
    handle.registerHelper('word', function(item) {
        return (item / 10000).toFixed(2)
    })
    return function(text, data, parent, flag) {
        if (flag) {
            $(parent).append(handle.compile(text)(data))
        } else {
            $(parent).html(handle.compile(text)(data))
        }
    }
})