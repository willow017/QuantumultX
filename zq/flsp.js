/*
name:中青看点阅读
author:willow
time: 25/2/2022
github: https://github.com/willow017/QuantumultX
instruction: [task_local]
             0 10-18/2 * * * https://raw.githubusercontent.com/willow017/QuantumultX/main/zq/flsp.js, tag=中青看点福利视频, enabled=true
*/

const url = 'https://kandian.wkandian.com/V17/NewTaskIos/recordNum.json';
const flspbodys = $prefs.valueForKey('flsp_auto')
const body = flspbodys.split('&');
const i = Math.round(Math.random()*body.length)

flsp(i);


function flsp(i) {
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
        flsp = '福利视频';
        console.log(response.body)
        $notify(title,flsp,`阅读成功🥂`);
        console.log(`阅读成功`)      
        $.done();
        }, reason => {
        title = '中青看点';
        flsp = '福利视频';
        console.log('失败');
        $notify(title,flsp,`第${i}次阅读失败🥂`);
        $.done();
        }
    );
}
