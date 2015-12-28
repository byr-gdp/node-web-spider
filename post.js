var superagent = require('superagent');

var url = "http://127.0.0.1:5000/post";
var body = "id=1&name=gdp";

superagent
  .post(url)
  .send(body)
  .end(function(err, res) {
    console.log(res);
  });