/**
0. http://www.nmc.cn/publish/forecast/ABJ/beijing.html 爬取 七天天气数据
1. 通过查看源码发现数据是后台渲染
2. 通过 superagent 发出 GET 请求，cheerio 来分析 DOM 结构，
3. div.today 和 div.day 来回切换。这里仅分析了 div.today
**/

var cheerio    = require('cheerio');
var superagent = require('superagent');

var baseUrl = 'http://www.nmc.cn/publish/forecast/ABJ/beijing.html';

superagent.get(baseUrl)
  .end(function(err, sres) {
    if(err) {
      console.error(err);
      return;
    }

    var $ = cheerio.load(sres.text);
    var items = [];

    // 分析 div.today 下数据
    // div.day 下同理。
    $('#forecast > .detail').each(function(i, e) {

      var today_dname = $(e).find('.dname').text().trim();
      var today_weekday = $(e).find('tr').eq(0).find('td').eq(0).find('p').eq(1).text().trim();
      var today_date = $(e).find('tr').eq(0).find('td').eq(1).text().trim();
      var today_wdesc_start = $(e).find('.wdesc').eq(0).text().trim();
      var today_wdesc_end = $(e).find('.wdesc').eq(1).text().trim();
      var today_temp_start = $(e).find('.temp').eq(0).text().trim();
      var today_temp_end = $(e).find('.temp').eq(1).text().trim();
      var today_direct_start = $(e).find('.direct').eq(0).text().trim();
      var today_direct_end = $(e).find('.direct').eq(1).text().trim();
      var today_power_start = $(e).find('.power').eq(0).text().trim();
      var today_power_end = $(e).find('.power').eq(1).text().trim();

      items.push({
        today_dname: today_dname,
        today_weekday: today_weekday,
        today_date: today_date,
        today_wdesc_start: today_wdesc_start,
        today_wdesc_end: today_wdesc_end,
        today_temp_start: today_temp_start,
        today_temp_end: today_temp_end,
        today_direct_start: today_direct_start,
        today_direct_end: today_direct_end,
        today_power_start: today_power_start,
        today_power_end: today_temp_end
      });
    });
    console.log(JSON.stringify(items));
  });
