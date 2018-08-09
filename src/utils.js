/**
 * All Codes below are Lifetime Warranted by mozat since 15/8/17.
 */


/**
 * get URL Params
 *
 * USAGE:
 * let paramName = getUrlParams('paramName');
 * let { param1, param2 } = getUrlParams('param1', 'params2');
 *
 * @returns {Object, Array}
 */

import Vue from 'vue'
// import axios from 'axios';

import axios from 'axios'

var myMixin = {
  methods: {
    iframeInsert(url) {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `loopsmozat://${url}`);
      iframe.style.height = 0;
      iframe.style.width = 0;
      iframe.style.position = 'absolute';
      iframe.style.zIndex = -1000;
      iframe.style.display = 'none';
      // console.log('iframe');
      document.body.appendChild(iframe);
      // after 1000ms. remove the iframe to make it looks clean.
      setTimeout(() => document.body.removeChild(iframe), 1000);
    },
    openChannelprofile(hostId) {
      const url = 'general/openChannelprofile?uid=' + hostId
      // console.log('跳转个人主页的链接：' + url);
      this.iframeInsert(url)
    },
    /**
     * 埋点的方法
     * @param id  [type: Number]  [埋点工程师规定的一个固定数字]
     * @param params [type: Object] [传入后台需要的参数，比如{ host_id : 主播id }]
     * 通过Object.assign合并成一个对象：比如{ id: 14123, ts: 时间戳, host_id: 主播id }；
     * 注：安卓5.*与IOS8.*都还不支持Object.assign的，因此要进行Polyfill；不过loops应用中是支持的，还好。
     */
    _di(obj, id) {
      var params = obj || {};
      //14225 活动通用id
      params.id = id || 14225;
      params.ts = Date.now();
      var url = 'util/statistical?point=' + JSON.stringify(params);
      // console.log('埋点链接：'+ url);
      this.iframeInsert(url);
      // console.log('埋点完毕');
    },

    /*跳转页面方法 openURL
    * // loopsmozat://util/openUrl?url=xxx&title=xxx
    *
    * */


    /*这个是弹出提示方法*/
    toast(text) {
      const encodeText = encodeURI(text)
      const url = 'util/showShortTip?tipText=' + encodeText;
      this.iframeInsert(url);
    },


    /**
     *  打开APP中的某个界面
     * @param pageName  [type: String]
     * @param unlockType [type: Number] [-1: default, 0:  ‘all’, 1: ‘broadcaster’, 2: ‘looper ’]
     * 注：只有当 pageName == "mytitle"时需要设置unlockType；且一般传入-1
     * pageName的取值为下面中的某一个：{mydiamond, home(即live tab), mylevel,leaderboard,mytitle,topup,myprofile,upcoming}
     * 使用方式：openAppPage('mytitle', -1)
     */
    openAppPage(pageName, unlockType) {
      const url = 'util/openAppPage?pageName=' + pageName + '&unlockType=' + unlockType;
      this.iframeInsert(url);
    },


    /**
     *  打开game中的某个界面
     * @param appid  [type: number] //游戏id
     * @param version [type: Number] //游戏版本
     */
    openGame(appid, version) {
      const url = `util/openGame?appid=${appid}&version=${version}`;
      this.iframeInsert(url);
    },

    /*这个是解析url拼接内容的*/
    getUrlParams(...args) {

      /*这个函数的作用是将uerid和token分离出来*/
      function getByName(name) {
        const reg = new RegExp(`(^|&|\\?)${name}=([^&|#]*)`, 'i');
        // console.log(window.location.href.substring(0));
        const param = window.location.href.substring(0).match(reg);
        // console.log(param);
        if (param !== null) {
          return param[2];
        }
        return undefined;
      }

    /*  function getByName(name){
        var reg = new RegExp("(^|&|)"+name+"=([^&]*)(&|$)");
        console.log(name);
        var r =  window.location.search.substr(1).match(reg);
        console.log(r);
        var strValue = "";
        if (r!=null){
          strValue= r[2];
        }
        return strValue;
      }*/


      if (arguments.length === 1) {
        return getByName(args[0]) || {};
      }
      const result = {};
      [...args].forEach((name) => {
        result[name] = getByName(name);
      });

      console.log(result,'最后结果');
      return result;
    },


    /**
     * 这个方法是打开某个视频？？或某个直播间？Tomi说是直播间
     * @param sid [type: String]  [直播间的id，为何是string，不是number？写错了？]
     * @param cid [type: String]  [Tomi说这个是当前用户的userId]
     */
    openVideo(sid, cid) {
      const url = 'broadcast/openVideo?cid=' + cid + '&sid=' + sid;
      this.iframeInsert(url);
      // console.log('跳转直播间'+url);

    },
    closeWebviewPage() {
      this.iframeInsert('general/closeWindow')
    },


    testData(url){
      return axios.get('http://192.168.50.73:3003/'+url)
    },

    //查询接口,根据id查询名字和头像
    bulkQuery(url, methodStr = 'post', data) {
      const {userId, token} = this.getUrlParams('userId', 'token');
      const REST_PREFIX = location.hostname == 'www-cdn.loopslive.com' ? 'https://api.loopslive.com/1.0/op/profile/' : 'https://api-test.loopslive.com/1.0/op/profile/'
      const baseUrl = REST_PREFIX;
      // const suffixUrl = `?zone=sg&token=${token}&uid=${userId}`;
      const suffixUrl = `?zone=sa&token=${token}&uid=${userId}`;
      const myUrl = baseUrl + url + suffixUrl;
      // const mydata = JSON.stringify({ ...data, uid: Number(userId) });
      /*这里不能转json*/
      const mydata = {...data, uid: Number(userId)};
      return axios({
        url: myUrl,
        method: methodStr,
        data: mydata,
      });
    },


    /*第三阶段获取数据*/
    getStage(url,myData) {
      const { userId, token } = this.getUrlParams('userId', 'token');
      // console.log(myData);
      const stage =myData?{sub_stage:myData}:{};
      const REST_PREFIX = location.hostname == 'www-cdn.loopslive.com' ? 'http://34.242.108.194:8011/' : 'http://183.62.254.246:8033/';
      const baseUrl = REST_PREFIX;
      // const suffixUrl = `?zone=sa&token=${token}&family_id=64`;
      const suffixUrl = `?zone=sa&token=${token}&uid=${userId}`;
      const myUrl = baseUrl + url + suffixUrl;
      return axios.get(myUrl,{
        params:stage
      });
    },


    /*第三阶段下注*/
    betData(url,myData){
      const { userId, token } = this.getUrlParams('userId', 'token');
      // console.log(myData);
      const stage =myData;
      const REST_PREFIX = location.hostname == 'www-cdn.loopslive.com' ? 'http://34.242.108.194:8011/' : 'http://183.62.254.246:8033/';

      const baseUrl = REST_PREFIX;
      // const suffixUrl = `?zone=sa&token=${token}&family_id=64`;
      const suffixUrl = `?zone=sa&token=${token}&uid=${userId}`;
      const myUrl = baseUrl + url + suffixUrl;
      return axios.get(myUrl,{
        params:myData||{}
      });
    },


    /**
     * 判断手机操作系统。
     * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
     *  但后续一般是使用另一个接口去跳转手机里的APP Store：iframeInsert('util/openAppStore?iosId=1085411495&androidId=mozat.rings.loops')
     * @returns {String}
     */
    getMobileOperatingSystem() {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone';
      }

      if (/android/i.test(userAgent)) {
        return 'Android';
      }

      // iOS detection from: http://stackoverflow.com/a/9039885/177710

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'iOS';
      }

      return 'unknown';
    },


  }

}

Vue.mixin(myMixin);


