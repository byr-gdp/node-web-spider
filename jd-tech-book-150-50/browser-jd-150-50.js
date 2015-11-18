// 运行环境：浏览器控制台
// 活动地址：http://sale.jd.com/act/8Rso1fQu2E.html
// 作用：获得所有活动图书名字和销售链接
// 执行脚本后，复制 booksName 和 booksUrl到脚本"node-jd-150-50.js"，然后 node 执行该脚本

var items = $(".jItem");
var length = items.length;
var booksName = "";
var booksUrl = "";

for(var i=0; i<length; i++) {
  var title = $(items[i]).find(".jDesc").attr("title");
  var url = $(items[i]).find(".jDesc a").attr("href");
  booksName = booksName + title + ",";
  booksUrl = booksUrl + url +",";
  // console.log(i + ":" + title + " - " + url);
}

console.log(booksName);
console.log(booksUrl);