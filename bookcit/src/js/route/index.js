define(['page', 'apindex'], function(page, apindex) {
    page('*', apindex.start); //开始 
    page('/', '/index/bookcity'); //默认进入书城
    page('/index/bookcity', apindex.bookcity); //书城
    page('/index/bookshelf', apindex.bookshelf); //书架 
    page('/page/detail/:pageid', apindex.detail);
    page('/page/read/:pageid', apindex.read);
    page('/page/menu/:pageid', apindex.menu) //目录页
        // page('/page/search', apindex.search);
    page('*', apindex.render); //监听所有的路由
    page() //调用
})