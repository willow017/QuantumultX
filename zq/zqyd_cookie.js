/*
name:中青看点阅读body
author:willow
time: 25/2/2022
github: https://github.com/willow017/QuantumultX
instruction: [mitm]
             hostname = kandian.wkandian.com
             [rewrite_local]
             ^https://kandian\.wkandian\.com/v5/article/complete\.json url script-request-body https://raw.githubusercontent.com/willow017/QuantumultX/main/zq/zqyd_cookie.js
             ^https://kandian\.wkandian\.com/V17/NewTaskIos/recordNum\.json url script-request-body https://raw.githubusercontent.com/willow017/QuantumultX/main/zq/zqyd_cookie.js

*/
let YouthBody = $prefs.valueForKey('youth_autoread');
const title = '中青看点';
const ftitle = '阅读body';
const flsp = '福利视频';


//获取阅读body
if (isGetbody = typeof $request !==`undefined`) {
  Getbody();
  $done({});
} 


function Getbody() {
    if ($request && $request.url.match(/\/article\/complete/)) {
       if($request.url.match(/complete/)){
          bodyVal = $request.body
       } else {
        bodyVal = $request.url.split("?")[1]
        };
        if (YouthBody) {
            if (YouthBody.indexOf(bodyVal) > -1) {
                console.log("此阅读请求已存在，本次跳过")
            } else if (YouthBody.indexOf(bodyVal) == -1) {
                YouthBodys = YouthBody + "&" + bodyVal;
                $prefs.setValueForKey(YouthBodys, 'youth_autoread');
                console.log(`中青看点获取阅读: 成功, YouthBodys: ${bodyVal}`);
                bodys = YouthBodys.split("&")
                $notify(title, "获取第" + bodys.length + "个阅读请求: 成功🎉", ``)
            }
        } else {
            $prefs.setValueForKey(bodyVal, 'youth_autoread');
            console.log(`中青看点获取阅读: 成功, YouthBodys: ${bodyVal}`);
            $notify(title, `获取第一个阅读请求: 成功🎉`, ``)
        }
    }
}
