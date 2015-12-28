var superagent = require("superagent");
var encoding   = require("encoding");

var url = "http://bbs.byr.cn/user/ajax_login.json";
var url2 = "http://bbs.byr.cn/article/Talking/ajax_post.json";

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
var cont = "content=mark2&id=5763335&subject=Re: 妹子打水插队被打，大家说说谁有道理？";

var log = "id=anthozoan77&passwd=19940317gdp"

var location = "http://domain/post"
var body = "boardName toipicId content userName password"

superagent
  .post(url)
  .send(log)
  .set('X-Requested-With', 'XMLHttpRequest')
  .set('Accept', 'application/json')
  .parse(parser)
  .end(function(err, res){
    // Calling the end function will send the 
    // console.log(res.headers);
    var headers     = res.headers;
    var str         = JSON.stringify(headers);
    var cookieStart = str.indexOf('set-cookie') + 13;
    var cookieEnd   = str.indexOf('expires') - 3;

    var cookie = str.substring(cookieStart, cookieEnd);
    var cookies = cookie.split(",");
    // console.log(cookies);
    var result = "";
    for(var i = 0; i < cookies.length; i++) {
      var pos = cookies[i].indexOf(";");
      var tmp = cookies[i].substring(1, pos);
      result += tmp + ";";
    }
    // console.log(result);
    superagent
      .post(url2)
      .send(cont)
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Accept', 'application/json')
      .set('Cookie', result)
      .parse(parser)
      .end(function(err, res){
        // Calling the end function will send the request
        console.log(res.text);
      });
  });
















