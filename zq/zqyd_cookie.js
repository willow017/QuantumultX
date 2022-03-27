/*
name:中青看点阅读body
author:willow
time: 25/2/2022
github: https://github.com/willow017/QuantumultX
instruction: [mitm]
             hostname = kandian.wkandian.com
             [rewrite_local]
             ^https://kandian\.wkandian\.com/v5/article/complete\.json url script-request-body https://raw.githubusercontent.com/willow017/QuantumultX/main/zq/zqyd_cookie.js

*/
let YouthBody = $prefs.valueForKey('youth_autoread');
let flspBody = $prefs.valueForKey('flsp_auto');
const title = '中青看点';
const ftitle = '阅读body';


//获取阅读body
if (isGetbody = typeof $request !==`undefined`) {
  Getbody();
  flspbody();
   $done({})
} 


function flspbody() {
  if ($request && $request.url,match(/\/NewTaskIos\/recordNum/)){
    if ($request.url.match(/recordNum/)){
      bodyVal = $request.body
    } else {
      bodyVal = $request.url.split("?")[1]
    };
    if (flspBody) {
      if (flspBody.indexOf(bodyVal)>-1){
        console.log("此阅读请求已存在，本次跳过")
      } else if (flspBody.indexOf(bodyVal)==-1) {
        flspBodys = flspBody + "&" + bodyVal;
        $prefs.setValueForKey(flspBodys, 'flsp_auto');
        console.log(`中青看点获取福利视频: 成功, flspBodys: ${bodyVal}`);
        bodys = flspbodys.split("&")
        $notify(title, "获取第" + bodys.length + "个福利视频请求: 成功🎉", ``)
      }
    } else {
      $prefs.setValueForKey(bodyVal, 'flsp_auto');
      console.log(`中青看点获取阅读: 成功, flspBodys: ${bodyVal}`);
      $notify(title, `获取第一个福利视频请求: 成功🎉`, ``)
    }
  }
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
