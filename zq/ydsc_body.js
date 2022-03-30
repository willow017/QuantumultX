/*
name:中青看点阅读body
author:willow
time: 25/2/2022
github: https://github.com/willow017/QuantumultX
instruction: [mitm]
             hostname = kandian.wkandian.com
             [rewrite_local]
             ^https://kandian\.wkandian\.com/v5/user/stay\.json url script-request-body https://raw.githubusercontent.com/willow017/QuantumultX/main/zq/ydsc_cookie.js
             

*/
let YdscBody = $prefs.valueForKey('ydsc_auto');
const title = '中青看点';
const ftitle = '阅读时长body';
const flsp = '阅读时长';


//获取阅读body
if (isGetbody = typeof $request !==`undefined`) {
  Getbody();
  $done({})
} 


function Getbody() {
    if ($request && $request.url.match(/\/user\/stay/)) {
       if($request.url.match(/stay/)){
          bodyVal = $request.body
       } else {
        bodyVal = $request.url.split("?")[1]
        };
        if (YdscBody) {
            if (YdscBody.indexOf(bodyVal) > -1) {
                console.log("此阅读时长请求已存在，本次跳过")
            } else if (YdscBody.indexOf(bodyVal) == -1) {
                YdscBodys = YdscBody + "&" + bodyVal;
                $prefs.setValueForKey(YdscBodys, 'ydsc_auto');
                console.log(`中青看点阅读时长: 成功, YdscBodys: ${bodyVal}`);
                bodys = YdscBodys.split("&")
                $notify(title, "获取第" + bodys.length + "个阅读时长请求: 成功🎉", ``)
            }
        } else {
            $prefs.setValueForKey(bodyVal, 'ydsc_auto');
            console.log(`中青看点阅读时长: 成功, YdscBodys: ${bodyVal}`);
            $notify(title, `获取第一个阅读时长请求: 成功🎉`, ``)
        }
    }
}
