// 获取京东科技图书 150 - 50 活动图书名字及价格
// 活动链接见 url
// 由于编码问题不能解决，退而求其次。详见目录"jd-tech-book-150-50"
// 价格由于是 AJAX 获取，不能直接通过页面取得

var url = "http://sale.jd.com/act/8Rso1fQu2E.html"

var http         = require("http");
var cheerio      = require("cheerio");
var iconv        = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');

function download(url, callback) {
    http.get(url, function(res) {
        var data = "";
        // 对于非 utf8 编码采用buffer
        // var bufferHelper = new BufferHelper();
        res.on('data', function (chunk) {
            data += chunk;
            // bufferHelper.concat(chunk);
        });
        res.on("end", function() {
            // console.log('data: ' + data);
            callback(data);
            // callback(iconv.decode(bufferHelper.toBuffer(), 'utf8'));
        });
    }).on("error", function() {
        callback(null);
    });
}


download(url, function(data) {
    if (data) {
        var $ = cheerio.load(data);

        // 京东相关 间接性抽风
        $(".jItem").each(function(i, e) {
            // 图书名
            var bookName = $(e).find(".jDesc").attr("title");
            // 图书购买链接
            var link = $(e).find(".jDesc a").attr("href");
            // var price  = $(e).find($(".jdPrice > span[class=jsNum]")).text();
            // var price = $(e).find(".jPrice .jdPrice span").text();
            console.log(bookName + " - " + link);
        })
    }
    else{
        console.log("error");
    }
});
