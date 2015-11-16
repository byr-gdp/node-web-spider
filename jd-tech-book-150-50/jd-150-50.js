// 运行环境：浏览器控制台
// 目的地址：http://sale.jd.com/act/8Rso1fQu2E.html
// 作用：获得所有活动图书名字

var items = $(".jItem");
var length = items.length;
var result = "";

for(var i=0; i<length; i++) {
  var title = $(items[i]).find(".jDesc").attr("title");
  //var priceBefore = $(items[i]).find(".jsNum").text();
  //var priceNow = $(items[i]).find(".jdNum").text();
  //result = result + "\n" + title + " - 原价：" + priceBefore +" - 现价：" + priceNow; 
  result = result + title + ",";
}

console.log(result);