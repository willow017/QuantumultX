/*
name:中青看点阅读
author:willow
time: 25/2/2022
github: https://github.com/willow017/QuantumultX
instruction: [task_local]
             0,20,40 12-21 * * * https://raw.githubusercontent.com/willow017/QuantumultX/main/zq/zqyd.js, tag=中青看点阅读, enabled=true
*/

const url = 'https://kandian.wkandian.com/v5/article/complete.json';
const ydbodys = $prefs.valueForKey('youth_autoread')
const body = ydbodys.split('&');
const i = Math.round(Math.random()*body.length)

ydjl(i);


function ydjl(i) {
const myrequest = {
      url: url,
      method: 'post',
      header: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-Hans-CN;q=1',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'kandian.wkandian.com',
            'User-Agent': 'KDApp/2.6.2 (iPad; iOS 15.3.1; Scale/2.00)'},
      body: body[i]
};

$task.fetch(myrequest).then(response => {
      //data = response.body.results[0].location.name ;
      title = '中青看点';
      ftitle = '阅读';
      console.log(response.body)
      $notify(title,ftitle,`阅读成功🥂`);
      console.log(`阅读成功`)      
      $.done();
      }, reason => {
      title = '中青看点';
      ftitle = '阅读';
      console.log('失败');
      $notify(title,ftitle,`第${i}次阅读失败🥂`);
      $.done();
      }
);
}
