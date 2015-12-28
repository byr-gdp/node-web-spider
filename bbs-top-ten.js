// 获取北邮人论坛（http://bbs.byr.cn）十大内容
// 包括标题 - 作者 - 链接

var http    = require("http");
var cheerio = require("cheerio");

// 解决gbk 编码问题
var iconv        = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');

function download(url, callback) {
    http.get(url, function(res) {
        // 对于非 utf8 编码采用buffer
        var bufferHelper = new BufferHelper();
        res.on('data', function (chunk) {
            bufferHelper.concat(chunk);
        });
        res.on("end", function() {
            callback(iconv.decode(bufferHelper.toBuffer(), 'GBK'));
        });
    }).on("error", function() {
        callback(null);
    });
}

var url = "http://bbs.byr.cn/rss/topten"

download(url, function(data) {
    if (data) {
        var $ = cheerio.load(data);
        $("item").each(function(i, e) {
            var title = $(e).find("title").text();
            var author = $(e).find("author").text();
            // link 无法获取，用comments代替链接
            // var link = $(e).find("link").text();
            var comments = $(e).find("comments").text();
            console.log(title + " - " + author + " - " + comments);
        })
    }
    else{
        console.log("error");
    }
});
