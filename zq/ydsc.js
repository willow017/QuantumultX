/*
name:中青看点阅读时长
author:willow
time: 31/3/2022
github: https://github.com/willow017/QuantumultX
instruction: [task_local]
             60/5 10-18/2 * * * https://raw.githubusercontent.com/willow017/QuantumultX/main/zq/ydsc.js, tag=中青看点阅读时长, enabled=true
*/

const url = 'https://kandian.wkandian.com/v5/user/stay.json';
const flspbodys = $prefs.valueForKey('flsp_auto')
const body = flspbodys.split('&');
const i = Math.round(Math.random()*body.length)

ydsc(i);


function ydsc(i) {
    const myrequest = {
        url: url,
        method: 'post',
        header: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-Hans-CN;q=1',
                'Connection': 'keep-alive',
                'Content-Length: 871',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Host': 'kandian.wkandian.com',
                'User-Agent': 'KDApp/2.6.2 (iPad; iOS 15.3.1; Scale/2.00)'},
        body: body[i]
    };

    $task.fetch(myrequest).then(response => {
        title = '中青看点';
        ydsc = '阅读时长';
        console.log(response.body)
        $notify(title,ydsc,`阅读时长成功🥂`);
        console.log(`阅读成功`)      
        $.done();
        }, reason => {
        title = '中青看点';
        ydsc = '阅读时长';
        console.log('失败');
        $notify(title,ydsc,`第${i}次阅读时长失败🥂`);
        $.done();
        }
    );
}
