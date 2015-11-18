// 运行环境：node
// 活动地址：http://sale.jd.com/act/8Rso1fQu2E.html
// 作用：根据图书销售链接查询该图书 ISBN，继而通过豆瓣 api，查询该图书评分信息。另一种做法直接根据书名查询评分信息。相比前者直接上更准确。
// 依赖：jd-150-50.js：在浏览器端运行获得活动图书书名详情并填充 "str_books" 和 "arr_urls"（需处理）

var request = require("request");
var cheerio = require("cheerio");
var http    = require("http");

var str_books = "霍金经典著作套装：时间简史·插图版+果壳中的宇宙+大设计+我的简史（套装共4册） ,一本不正经的科学：用科学满足你“变态”的好奇心 ,禁止入内，揭密被掩盖的事实（套装全4册） ,如果科学可以这么搞：以科学的名义回答最“搞”的奇葩问题 ,水知道答案：每一滴水都有记忆（全彩终结版） ,决定经典003 自然史（全新修订版） ,科学的旅程（珍藏版） ,枪与玫瑰的使用方法 ,无言的宇宙：隐藏在24个数学公式背后的故事 ,决定经典002：相对论（全新修订版） ,写给全人类的数学魔法书 ,决定经典006：物种起源（全新修订版） ,决定经典001 几何原本（全新修订版） ,托梅教授的植物图谱（套装上下册） ,通用博物学图典 ,园艺花卉图谱 ,大人的科学 牛顿天文望远镜 ,大人的科学：浪漫四季星空灯 ,大人的科学：流光幻彩折纸灯 ,大众天文学（套装上下册） ,冷浪漫(2015版) ,谣言粉碎机 ,飞行中的科学 ,趣味科学系列丛书 趣味物理学 ,即将到来的场景时代 ,云计算（第三版） ,互联网+医疗健康：迈向5P医学时代 ,Java常用算法手册（含盘） ,无师自通：网上开店推广与经营超简单（附光盘） ,Storm：大数据流式计算及应用实践 ,O'Reilly：LINUX设备驱动程序（第3版） ,深入浅出Objective-C（修订版） ,非常实用 PPT 2013设计、制作与技巧从新手到高手（全彩图解视频版 附光盘） ,你早该这么玩Excel（wifi版） ,超好学！PowerPoint精美演示（全图解100%）（附光盘1张） ,竞争力为职场加分的超强PPT设计（附光盘） ,如此简单！ 你也可以玩转Word/Excel（附光盘） ,你早该这么玩ExcelⅡ（wifi版） ,Excel公式、函数、图表与数据处理应用大全（附光盘） ,Excel 2013公式、函数、图表与电子表格制作（超值视频教学版 附光盘） ,离线·开始游戏 ,离线·黑客 ,安防&云计算：物联网智能云安防系统实现方案 ,无线网络黑客攻防（畅销版）（含盘） ,7天精通黑客攻防（畅销版 附光盘） ,架构大数据：大数据技术及算法解析 ,智慧社区：物联网时代的未来家园 ,与机器人交朋友（实战篇） ,园冶 ,这样装修不上当：轻松12课，菜鸟变专家 ,NA建筑家系列（套装1~4册） ,家装水电工技能现场通（全彩超值精编版） ,建筑结构设计快速入门（第2版） ,商业地产招商运营：范本·案例·策划·工具 ,智能家居系统安装工艺与接线 ,最爱中式风：卧室·书房·卫浴设计 ,图解黄帝内经 ,放弃尚早 : 渡边淳一医学访谈录（下）（重症卷） ,图解特效穴位使用手册 ,放弃尚早 : 渡边淳一医学访谈录（上）（常见病卷） ,影像读片从入门到精通系列：CT读片指南（第2版） ,我与癌症这九年 ,皮肤镜图像处理技术 ,图解本草纲目：认识中国第一药典（2014经典图解畅销版） ,全球制造业的颠覆：工业4.0 ,百年航天 ,全彩速学空调器维修 ,服装制作入门手册 ,SMT可制造性设计（全彩） ,看图学艺·服装篇：图解服装裁剪100例 ,汽车顶级驾驶 终极问答 ,电气控制与PLC应用快速入门 ,羊病快速诊治指南 ,日式花道 ,300种常见园林树木识别图鉴 ,阳台种菜大全 ,黄鳝养殖新技术（第二版） ,饲料科学配制技术丛书：学就会的鸡饲料科学配方 ,一学就会的猪饲料科学配方 ,稻田生态养鳖技术 ,The Oxford Picture Dictionary牛津英-汉图片词典，第二版 英文原版 ,Merriam-Webster's Vocabulary Builder ,The Lord of the Rings: Boxed Set, Film Tie-in指环王，套装共3册 英文原版 ,Lego Brickmaster the Quest for Chi (Lego Legends of Chima)(Book + Toy)  乐高砖书和玩具 英文原版 ,World of Ice and Fire冰与火之歌的前传 英文原版 ,Lonely Planet: Shanghai (Travel Guide)孤独星球旅行指南：上海 英文原版 ,The Official Guide for GMAT Verbal Review 2015 with Online Question Bank and Exclusive Video 英文原版 ,Steve Jobs: Insanely Great ,我們從未不認識: 林宥嘉音樂小說概念書 ,熊貓來了! 比黑白配更重要的決定 范范與飛哥翔弟的幸福日記 ,小雨麻的副食品全紀錄: 158道寶寶超愛的當令食譜 過敏兒這樣吃也沒問題! (2015增修版) ,塑身女皇教你打造完美曲線 (附DVD) ,讓你wow！的Kokoma糖霜餅乾 ,忘憂森林:英國威爾斯大自然療癒著色畫 ,觀光實用日語（隨書附贈聽力CD一片） ,六六作品集：大話女王 ,"
var arr_urls  = ["http://item.jd.com/11766998.html", "http://item.jd.com/11737800.html", "http://item.jd.com/11245681.html", "http://item.jd.com/11740072.html", "http://item.jd.com/10966040.html", "http://item.jd.com/10615952.html", "http://item.jd.com/11422361.html", "http://item.jd.com/11375718.html", "http://item.jd.com/11672203.html", "http://item.jd.com/10615955.html", "http://item.jd.com/11236833.html", "http://item.jd.com/10616967.html", "http://item.jd.com/10615957.html", "http://item.jd.com/11775564.html", "http://item.jd.com/11775576.html", "http://item.jd.com/11775581.html", "http://item.jd.com/11420131.html", "http://item.jd.com/11348873.html", "http://item.jd.com/11420127.html", "http://item.jd.com/11241891.html", "http://item.jd.com/11739248.html", "http://item.jd.com/10905498.html", "http://item.jd.com/11399398.html", "http://item.jd.com/11063967.html", "http://item.jd.com/11455533.html", "http://item.jd.com/11737318.html", "http://item.jd.com/11783865.html", "http://item.jd.com/11483650.html", "http://item.jd.com/11268063.html", "http://item.jd.com/11670353.html", "http://item.jd.com/10100144.html", "http://item.jd.com/11641857.html", "http://item.jd.com/11680800.html", "http://item.jd.com/11552959.html", "http://item.jd.com/11036745.html", "http://item.jd.com/11377750.html", "http://item.jd.com/11687403.html", "http://item.jd.com/11552965.html", "http://item.jd.com/11641851.html", "http://item.jd.com/11721563.html", "http://item.jd.com/11534101.html", "http://item.jd.com/11618644.html", "http://item.jd.com/11726553.html", "http://item.jd.com/11438750.html", "http://item.jd.com/11641843.html", "http://item.jd.com/11706330.html", "http://item.jd.com/11622847.html", "http://item.jd.com/11734646.html", "http://item.jd.com/11725459.html", "http://item.jd.com/11729100.html", "http://item.jd.com/11427988.html", "http://item.jd.com/11214416.html", "http://item.jd.com/10497728.html", "http://item.jd.com/10804457.html", "http://item.jd.com/11755702.html", "http://item.jd.com/11733832.html", "http://item.jd.com/11332474.html", "http://item.jd.com/11641218.html", "http://item.jd.com/11543558.html", "http://item.jd.com/11641222.html", "http://item.jd.com/11219491.html", "http://item.jd.com/11533675.html", "http://item.jd.com/11691837.html", "http://item.jd.com/11463798.html", "http://item.jd.com/11699347.html", "http://item.jd.com/11739555.html", "http://item.jd.com/11734637.html", "http://item.jd.com/11782427.html", "http://item.jd.com/11670371.html", "http://item.jd.com/10586145.html", "http://item.jd.com/11746493.html", "http://item.jd.com/10909924.html", "http://item.jd.com/10196367.html", "http://item.jd.com/11260409.html", "http://item.jd.com/11578276.html", "http://item.jd.com/11448533.html", "http://item.jd.com/11735989.html", "http://item.jd.com/11776212.html", "http://item.jd.com/11731504.html", "http://item.jd.com/11775325.html", "http://item.jd.com/19039765.html", "http://item.jd.com/19268708.html", "http://item.jd.com/19277398.html", "http://item.jd.com/19281826.html", "http://item.jd.com/19529285.html", "http://item.jd.com/19280016.html", "http://item.jd.com/19501972.html", "http://item.jd.com/19540476.html", "http://item.jd.com/16061135.html", "http://item.jd.com/16075473.html", "http://item.jd.com/16073225.html", "http://item.jd.com/16011833.html", "http://item.jd.com/16073694.html", "http://item.jd.com/16075480.html", "http://item.jd.com/16073983.html", "http://item.jd.com/16033587.html"]
var str_isbn = "";

var books = str_books.split(",");

var baseUrl = "http://api.douban.com/v2/book/search?q="
var baseUrlViaIsbn = "http://api.douban.com/v2/book/isbn/"

// 根据书名查询评分
// for(var i=0; i<books.length; i++) {
//   var url = baseUrl + encodeURIComponent(books[i]) + "";
//   request({
//     url: url,
//     json: true,
//   }, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       if (body !== undefined && body.books !== undefined && body.books[0] !== undefined) {
//         var aver = parseInt(body.books[0].rating.average);
//         // if (aver >= 7) {
//           console.log(body.books[0].title + " : " + body.books[0].rating.average); // Print the json response
//         // } 
//       }
//     } else {
//       console.log('error');
//     }
//   })
// }

// 以下根据isbn查询评分
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on("data", function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  })
}

// // 有输出结果，但不是等 arr_isbn 收集完之后再请求。
// for(var i=0; i<arr_urls.length; i++) {
//   download(arr_urls[i], function(data) {
//     if(data) {
//       var $ = cheerio.load(data);
//       var isbn = $(".p-parameter-list li").eq(1).attr("title");
//       // var rankUrl = baseUrlViaIsbn + isbn + "";
//       str_isbn = str_isbn + "," + isbn;

//       var arr_isbn = str_isbn.split(",");
//       console.log(arr_isbn);
//       arr_isbn.forEach(function(i, e) {
//         var rankUrl = baseUrlViaIsbn + i;
//         request({
//           url: rankUrl,
//           json: true
//         }, function(error, response, body) {
//           if (!error && response.statusCode === 200) {
//             if (body !== undefined) {
//               var aver = parseInt(body.rating.average);
//               var author = body.author;
//               var bookName = body.title;
//               console.log(bookName + ":" + aver);
//             }
//           }
//         });
//       }); 
//     }        
//   }); 
// }

// 正常输出能查找到的评分信息
for(var i=0; i<arr_urls.length; i++) {
  download(arr_urls[i], function(data) {
    if(data) {
      var $ = cheerio.load(data);
      var isbn = $(".p-parameter-list li").eq(1).attr("title");
      var rankUrl = baseUrlViaIsbn + isbn;
      request({
        url: rankUrl,
        json: true
      }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          if (body !== undefined) {
            var aver = parseInt(body.rating.average);
            var author = body.author;
            var bookName = body.title;
            console.log(i + ": " + bookName + ":" + aver);
          } else {
            console.log('second else');
          }
        } else {
          console.log('first else');
        }
      });
    }        
  }); 
}
