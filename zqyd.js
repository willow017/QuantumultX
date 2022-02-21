const $ = new Env("中青看点阅读")
//const notify = $.isNode() ? require('./sendNotify') : '';
let ReadArr = [], timebodyVal ="";
let YouthBody = $.getdata('youth_autoread')||$.getdata("zqgetbody_body");
let smallzq = $.getdata('youth_cut');
let indexLast = $.getdata('zqbody_index');
let artsnum = 0, videosnum = 0;
let videoscore = 0,readscore = 0;
let artArr = [], delbody = 0;
if (isGetbody = typeof $request !==`undefined`) {
   Getbody();
   $.done()
} 
let lastIndex = $.getdata('zqbody_index')
if (!$.isNode() && !YouthBody == true) {
    $.log("您未获取阅读请求，请求阅读后获取")
    $.msg($.name, "您未获取阅读请求，请求阅读后获取", "", {
        'open-url': "https://kandian.wkandian.com/u/UnEWm"
    })
    $.done()
} else if (!$.isNode() && YouthBody.indexOf("&") == -1) {
    ReadArr.push(YouthBody)
} else {
    if ($.isNode()) {
        if (process.env.YOUTH_READ && process.env.YOUTH_READ.indexOf('&') > -1) {
            YouthBodys = process.env.YOUTH_READ.split('&');
            console.log(`您选择的是用"&"隔开\n`)
        } else if (process.env.YOUTH_READ && process.env.YOUTH_READ.indexOf('\n') > -1) {
            YouthBodys = process.env.YOUTH_READ.split('\n');
            console.log(`您选择的是用换行隔开\n`)
        } else {
            YouthBodys = [process.env.YOUTH_READ]
        }
    } else if (!$.isNode() && YouthBody.indexOf("&") > -1) {
        YouthBodys = YouthBody.split("&")
    };
    Object.keys(YouthBodys).forEach((item) => {
        if (YouthBodys[item]) {
            ReadArr.push(YouthBodys[item])
        }
    })
}
timeZone = new Date().getTimezoneOffset() / 60;
timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
});
console.log(`\n === 脚本执行 ${bjTime} ===\n`);
$.log("******** 您共获取" + ReadArr.length + "次阅读请求，任务开始 *******")

!(async() => {
    if (!ReadArr[0]) {
        console.log($.name, '【提示】请把抓包的请求体填入Github 的 Secrets 中，请以&隔开')
        return;
    }
if (!$.isNode()) {
  $.begin = indexLast ? parseInt(indexLast) : 1;
  if ($.begin + 1 < ReadArr.length) {
    $.log("\n上次运行到第" + $.begin + "次终止，本次从" + (parseInt($.begin) + 1) + "次开始");
  } else {
    $.log("由于上次缩减剩余请求数已小于总请求数，本次从头开始");
    indexLast = 0,
    $.begin = 0
  }
} else {
  indexLast = 0,
  $.begin = 0
}
    if (smallzq == "true") {
        $.log("     请注意缩减请求开关已打开‼️\n     如不需要    请强制停止\n     关闭Boxjs缩减请求开关")
    };
    $.index = 0, readtimes="";
    for (var i = indexLast ? indexLast : 0; i < ReadArr.length; i++) {
        if (ReadArr[i]) {
            articlebody = ReadArr[i];
            $.index = $.index + 1;
            $.log(`-------------------------\n开始中青看点第${$.index}次阅读\n`);
            await bodyInfo();
        }
    };
    $.log("\n……………………………………………………………………\n\n本次共删除" + delbody + "个请求，剩余" + (ReadArr.length - delbody) + "个请求");
    $.log("本次共阅读" + artsnum + "次资讯，共获得" + readscore + "青豆\n观看" + videosnum + "次视频，获得" + videoscore + "青豆(不含0青豆次数)\n");
    console.log(`-------------------------\n\n中青看点共完成${$.index}次阅读，共计获得${readscore+videoscore}个青豆，阅读请求全部结束`);
    $.msg($.name, `本次运行共完成${$.index}次阅读，共计获得${readscore+videoscore}个青豆`,"删除"+delbody+"个请求"+(readtimes?"，阅读时长"+parseInt(readtimes)+"分钟":""))
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

function bodyInfo() {
    return new Promise((resolve, reject) => {
        $.get(batHost('article/info/get.json?' + articlebody), async(error, resp, data) => {
            let bodyobj = JSON.parse(data);
            //$.log(JSON.stringify(bodyobj,null,2))
                $.begin = $.begin + 1;
                let res = $.begin % ReadArr.length;
                $.setdata(res + "", 'zqbody_index');
            try {
                if (bodyobj.error_code == "200007"&&!$.isNode()) {
                await removebody();
                delbody += 1;
                $.log(bodyobj.message+"已自动删除");
                } else if (bodyobj.error_code == 0) {
                    acticid = bodyobj.url.match(/\d+/)[0];
                    artdesc = bodyobj.description
                    author = bodyobj.account.name
                    ctype = bodyobj.ctype == 0 ? "阅读资讯" : "观看视频";
                    if (artArr.indexOf(acticid) == -1) {
                artArr.unshift(acticid);
                        $.log(ctype + ": " + artdesc + "  ----- " + author + "\n")
                        await $.wait(10000);
                        await AutoRead();
                    } else if (artArr.indexOf(acticid) > -1&&!$.isNode()) {
                        await removebody();
                        $.log("文章ID:" + acticid + " 请求重复，已自动删除")
                        delbody += 1;
                        await $.wait(1000)
                    }
                }
            } catch (e) {
                $.log('获取文章请求失败' + e)
            } finally {
                resolve()
            }
        })
    })
}


function AutoRead() {
    return new Promise((resolve, reject) => {
        $.post(batHost('article/complete.json', articlebody), async(error, response, data) => {
            let readres = JSON.parse(data);
            //$.log(JSON.stringify(readres,null,2))
            if (readres.items.complete == 1) {
                $.log(readres.items.max_notice)
            } else {
                if (readres.error_code == '0' && data.indexOf("read_score") > -1 && readres.items.read_score > 0) {
                    console.log(`本次阅读获得${readres.items.read_score}个青豆，请等待30s后执行下一次阅读\n`);
                    if (data.indexOf("ctype") > -1) {
                        if (readres.items.ctype == 0) {
                            artsnum += 1
                            readscore += parseInt(readres.items.read_score);
                        } else if (readres.items.ctype == 3) {
                            videosnum += 1
                            videoscore += parseInt(readres.items.read_score);
                        }
                    }
                    if ($.index % 2 == 0) {
                        if ($.isNode() && process.env.YOUTH_ATIME) {
                            timebodyVal = process.env.YOUTH_ATIME;
                        } else {
                            timebodyVal = $.getdata('autotime_zq');
                        }
                        await readTime()
                    };
                    if ($.index == ReadArr.length) {
                        $.log($.index + "次任务已全部完成，即将结束")
                    } else {
                        await $.wait(20000);
                    }
                } else if (readres.error_code == '0' && data.indexOf('"score":0') > -1 && readres.items.score == 0) {
                    $.log(`\n本次阅读获得0个青豆，等待10s即将开始下次阅读\n`);
                    if (smallzq == "true") {
                        await removebody();
                        $.log("已删除第" + ($.begin) + "个请求，如无需删除请及时提前关掉boxjs内的开关，使用后即关闭")
                        delbody += 1
                    }
                } else if (readres.success == false) {
                    console.log(`第${$.index}次阅读请求有误，请删除此请求`);
                    if (smallzq == "true") {
                        await removebody();
                        $.log("已删除第" + ($.begin) + "个请求，如无需删除请及时提前关掉boxjs内的开关，使用后即关闭");
                        delbody += 1
                    }
                }
            }
            resolve()
        })
    })
}

function removebody() {
  if($.isNode()) {
    return;
  }
  if (articlebody !== ReadArr[0]) {
      smallbody = $.getdata('youth_autoread').replace("&" + articlebody, "");
  } else {
      smallbody = $.getdata('youth_autoread').replace(articlebody + "&", "")
  }
  $.setdata(smallbody, 'youth_autoread')
}

function batHost(api, body) {
    return {
        url: 'https://kandian.wkandian.com/v5/' + api,
        headers: {
            'User-Agent': 'KDApp/2.4.1 (iPhone; iOS 14.6; Scale/3.00)',
            'Host': 'kandian.wkandian.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    }
}

function readTime() {
    return new Promise((resolve, reject) => {
        $.post(batHost('user/stay.json', timebodyVal), (error, resp, data) => {
            let timeres = JSON.parse(data)
            if (timeres.error_code == 0) {
                readtimes = timeres.time / 60
                $.log(`阅读时长共计` + Math.floor(readtimes) + `分钟`)
            }
            resolve()
        })
    })
}

function Getbody() {
    if ($request && ($request.url.match(/\/article\/info/)|| $request.url.match(/\/article\/complete/))) {
       if($request.url.match(/complete/)){
          bodyVal = $request.body
       } else {
        bodyVal = $request.url.split("?")[1]
        };
        if (YouthBody) {
            if (YouthBody.indexOf(bodyVal) > -1) {
                $.log("此阅读请求已存在，本次跳过")
            } else if (YouthBody.indexOf(bodyVal) == -1) {
                YouthBodys = YouthBody + "&" + bodyVal;
                $.setdata(YouthBodys, 'youth_autoread');
                $.log(`${$.name}获取阅读: 成功, YouthBodys: ${bodyVal}`);
                bodys = YouthBodys.split("&")
                $.msg($.name, "获取第" + bodys.length + "个阅读请求: 成功🎉", ``)
            }
        } else {
            $.setdata(bodyVal, 'youth_autoread');
            $.log(`${$.name}获取阅读: 成功, YouthBodys: ${bodyVal}`);
            $.msg($.name, `获取第一个阅读请求: 成功🎉`, ``)
        }
    } else if ($request && $request.method != `OPTIONS` && $request.url.match(/\/v5\/user\/stay/)) {
        const timebodyVal = $request.body;
        if (timebodyVal) $.setdata(timebodyVal, 'autotime_zq');
        $.log(`${$.name}获取阅读时长: 成功, timebodyVal: ${timebodyVal}`);
        $.msg($.name, `获取阅读时长: 成功🎉`, ``)
    }
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
