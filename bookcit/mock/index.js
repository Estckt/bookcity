var bookcity = require('./index/home');
var bookshelf = require('./index/recommend1');
var page = require('./index/recommend2');
var pagetwo = require('./index/recommend3');
var detail = require('./detail/352876');
var read1 = require('./reader/data1');
var read2 = require('./reader/data2');
var read3 = require('./reader/data3')
var read4 = require('./reader/data4')
var chapter = require('./reader/chapter-list');
var data = {
    "/api/bookcity": bookcity,
    "/api/bookshelf": bookshelf,
    "/api/bookcityload?pagenum=1": bookshelf,
    "/api/bookcityload?pagenum=2": page,
    "/api/bookcityload?pagenum=3": pagetwo,
    "/api/detail?id=352876": detail,
    "/api/read?bookid=352876&char=1": read1,
    "/api/read?bookid=352876&char=2": read2,
    "/api/read?bookid=352876&char=3": read3,
    "/api/read?bookid=352876&char=4": read4,
    "/api/chapter?bookid=352876": chapter
};
module.exports = function(url) {
    return JSON.stringify(data[url])
}