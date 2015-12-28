var superagent = require("superagent");
var encoding   = require("encoding");

var url = "http://bbs.byr.cn/article/Talking/ajax_post.json";

var parser = function(res, done) {
  res.text = '';
  res.setEncoding('binary');
  res.on('data', function(chunk) { res.text += chunk });
  res.on('end', function() {
    res.text = encoding.convert(res.text, 'UTF8', 'GBK').toString();
    done();
  });
};

// var s = "left-index=0000000000; nforum[BMODE]=2; login-user=anthozoan77; nforum[UTMPUSERID]=anthozoan77; nforum[PASSWORD]=Ole%2B7KFEZbqJ39sFUTe02w%3D%3D; nforum[UTMPKEY]=93005579; nforum[UTMPNUM]=2735; nforum-left=001; Hm_lvt_38b0e830a659ea9a05888b924f641842=1450612821,1450695262,1450699970,1450751923; Hm_lpvt_38b0e830a659ea9a05888b924f641842=1450773423; nforum[XWJOKE]=hoho";


// PWD: Ole%2B7KFEZbqJ39sFUTe02w%3D%3D
// gb1212 -> % decode
// Ole+7KFEZbqJ39sFUTe02w==

//  Hm_lvt_38b0e830a659ea9a05888b924f641842=1450612821,1450695262,1450699970,1450751923; Hm_lpvt_38b0e830a659ea9a05888b924f641842=1450773733; 

// var cont = "content=--&id=5766125&subject=Re: 妹子打水插队被打，大家说说谁有道理？";
var cont = "content=。。&id=5763335&subject=Re: 妹子打水插队被打，大家说说谁有道理？";

var content = "content=%E3%80%82&id=5766125&subject=Re%253A%2520%25E5%25A6%25B9%25E5%25AD%2590%25E6%2589%2593%25E6%25B0%25B4%25E6%258F%2592%25E9%2598%259F%25E8%25A2%25AB%25E6%2589%2593%25EF%25BC%258C%25E5%25A4%25A7%25E5%25AE%25B6%25E8%25AF%25B4%25E8%25AF%25B4%25E8%25B0%2581%25E6%259C%2589%25E9%2581%2593%25E7%2590%2586%25EF%25BC%259F";

superagent
  .post(url)
  .send(cont)
  .set('X-Requested-With', 'XMLHttpRequest')
  .set('Accept', 'application/json')
  .set('Cookie', 'nforum-left=100; left-index=0000000000; login-user=anthozoan77; nforum[UTMPUSERID]=anthozoan77; nforum[PASSWORD]=I87%2FvLcEzHdtT6PS2WZiOQ%3D%3D; nforum[BMODE]=2; nforum[UTMPKEY]=64881886; nforum[UTMPNUM]=2660;')
  .parse(parser)
  .end(function(err, res){
    // Calling the end function will send the request
    console.log(res.text);
  });