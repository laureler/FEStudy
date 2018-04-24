var express = require('express')
var app = express()

var eventproxy = require('eventproxy')
var superagent = require('superagent')
var cheerio = require('cheerio')
// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html
var url = require('url')

var cnodeUrl = 'https://cnodejs.org/'
var ibaseUrl = 'http://192.168.10.58:8088/cas/login'
// var testUrl = 'http://localhost:3000/index'
var testUrl = 'http://localhost:8080/cas/login'
var mainWeb = 'http://192.168.10.58:8088/mainWeb/index/1'
var demoUrl = 'http://localhost:3000/index'

/*superagent.get(cnodeUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    // 获取首页所有的链接
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
      // 我们用 url.resolve 来自动推断出完整 url，变成
      // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
      // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
      var href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });

    console.log(topicUrls);
    var ep = new eventproxy()
// 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
    ep.after('topic_html', topicUrls.length, function (topics) {
      // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair

      // 开始行动
      topics = topics.map(function (topicPair) {
        // 接下来都是 jquery 的用法了
        var topicUrl = topicPair[0];
        var topicHtml = topicPair[1];
        var $ = cheerio.load(topicHtml);
        return ({
          title: $('.topic_full_title').text().trim(),
          href: topicUrl,
          comment1: $('.reply_content').eq(0).text().trim(),
        });
      });

      console.log('final:');
      console.log(topics);
    });

    topicUrls.forEach(function (topicUrl) {
      superagent.get(topicUrl)
        .end(function (err, res) {
          console.log('fetch ' + topicUrl + ' successful');
          ep.emit('topic_html', [topicUrl, res.text]);
        });
    });



  });*/

superagent.get(testUrl).redirects().end(function (err, res) {
  // debugger
  var cookie = res.header['set-cookie'][0]
  //var cookie = ''

  superagent.post(testUrl)
    .set({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      /*'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': '1',*/
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    })
    .set('Cookie', cookie)
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    .type('form')
    .send({'username':'admin2'})
    .send({"password":'8CB2237D0679CA88DB6464EAC60DA96345513964'})
    .send({'lt':'LT-30-NQwUr0NJMAulWRghjyGJUr11gcPoTr-cas01.ibase2.southgis.com'})
    .send({'execution':'d3a574cf-4262-48d8-9789-cc624188fb4f_AAAAIgAAABB8X/QHhicgTtyb567yCXb+AAAABmFlczEyONPYtafLyTTzryLcq6XkBOTl7xzGi4oWipxdldhUcUhRmdvc72OToy0lDsmXJIuUFuRsTl+1qX55Dho+1fJNXOBt19kj2uTQFpP8tJkHwN2I4/aVhXTwLYdnh3hyTMtQTCfjHdzBQbprTJngwElc2ShdzhLGXYarhNHMb/fczu5NKo9Y1LoSfjHs2s2UQmWcVGMlbBKB/MPHvgmRQMs1W8WpDnLTvsHIju25JO/BweGdgzY540jIXYrR0qeZjX1mi81qKRtNMX/sIrv1awwPEpU7B4DEmnBHE7aqBLSgmJ25U8JWjP6aaD2GzutRN2deNQxX2aMi8F51bg0+PzVNUXxeCnf9u2AZeFGuo2qKw64E4pUxsq0uARO36/IOH22b+VUd+V+4TWZH5hWYGs8PbFQJTfIF4iHEvzirs5dXworPzaSqC2s1Arfd0GeJoGCik00nWKA+UtAStjMVIoE49hRoM1kQ9DhYK4vOvWNfokTA0cC113s5ewZL4Itv8WeCpTLE/+7LjXmSdzb8wPUETEaWhMfIR7k7AzuW1Rak1mQ2ogLOSaPVsURgGkY5QMWW8POexjWmv6fNW4f424O6ke9RRpjRNCwFAQGZax2CpMH+K7jOoxBYpA2xV7NH1/RXQUMdhqNv7zBsuay+ebzG3HrFp9VX9iW9Q9zqeaxw/1A1rmatAtj3YDoUhtliTyeuP+lfnO99JGMl5/jDuOuWGRlYd1VqDrjpNSJf5EYMXAxMnLLOSD+6pUCtu5I8dcD+Fi2XgCkp71QKzONiB92q+MBoJ2iw7cAICRWScJY28G+lTEAgQAEQEpU02Njm1IxBKEfdtDOoKPr0GYAEirPKfq+UT3z5IgZ3VleXVHj4fRc79LxNiWjCmcaQC6t63L6PtsUyszsgUNzRy69SiqFVNDJkzKmEgafE+6XOdMuQboHO+vYM050hn/x71UXLLvNEVnp7dtPp8MDbL2LWN+6hCjfbqb/mhlrvUzKNtvqOlwChpzVUKoL6A7FYDQfvtaM+Y/Nw60r0KY0J8xHu4XqS64XouVUZEcS0TkH+HUkryGQj'})
    .send({'_eventId':'submit'})
    .send({'subSystem':'*'})
    .end((req, res) => {
      console.log(res.res.text)
    })

})

