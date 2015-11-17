// 运行环境：浏览器控制台
// 活动地址：http://sale.jd.com/act/8Rso1fQu2E.html
// 作用：获得所有活动图书名字

var items = $(".jItem");
var length = items.length;
var booksName = "";
var booksUrl = "";

for(var i=0; i<length; i++) {
  var title = $(items[i]).find(".jDesc").attr("title");
  var url = $(items[i]).find(".jDesc a").attr("href");
  //var priceBefore = $(items[i]).find(".jsNum").text();
  //var priceNow = $(items[i]).find(".jdNum").text();
  //result = result + "\n" + title + " - 原价：" + priceBefore +" - 现价：" + priceNow; 
  booksName = booksName + title + ",";
  booksUrl = booksUrl + url +",";
  console.log(i + ":" + title + " - " + url);
}

// var urls = booksUrl.split(",");

// console.log(urls.length)
// console.log(booksUrl);