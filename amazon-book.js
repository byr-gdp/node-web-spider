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

var url = "http://www.amazon.cn/s/ref=sr_pg_2?rh=n%3A658390051%2Cn%3A%212146619051%2Cn%3A%212146621051%2Cn%3A1559230071%2Cp_6%3AA1AJ19PSB66TGU&page=2&bbn=1559230071&ie=UTF8&qid=1447603385"

download(url, function(data) {
    if (data) {
        // console.log(data);
        var $ = cheerio.load(data);

        // amazon
        $("li[class='s-result-item celwidget']").each(function(i, e) {
            var bookName = $(e).find("h2[class='a-size-medium a-color-null s-inline s-access-title a-text-normal']").text();
            var price = $(e).find("span[class='a-size-base a-color-price s-price a-text-bold']").text();
            console.log(bookName + " - " + price);;
        })
    }
    else{
        console.log("error");
    }
});
