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
            // console.log(iconv.decode(bufferHelper.toBuffer(),'utf8'));
            // callback(iconv.decode(bufferHelper.toBuffer(), 'utf8'));
        });
    }).on("error", function() {
        callback(null);
    });
}

var url = "http://sale.jd.com/act/8Rso1fQu2E.html"

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
