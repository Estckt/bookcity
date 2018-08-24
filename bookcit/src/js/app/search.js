define(['jquery'], function($) {
    return function() {
        console.log($('.search'))
        $('.inp').on('input', function() {
            alert(11)
        })
    }
})