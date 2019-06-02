//import aes from 'crypto-js/aes'
//import encHex from 'crypto-js/enc-hex'
// padZeroPadding from 'crypto-js/pad-zeropadding'

cc.Class({
    extends: cc.Component,

    properties: {
        data: "{}",
        LoadingPrefab: {
            default: null,
            type: cc.Prefab,
        },
        callBackNode: {
            default: null,
            type: cc.Node,
        },
    },

    load: function (data) {
        this.data = data;

        if (this.callBackNode != null)
            this.callBackNode.emit('load-db');
    },
    start() {




        // message to encrypt
        /*let msg = "Hello skjfhslhskfjhfd";

        // the key and iv should be 32 hex digits each, any hex digits you want, but it needs to be 32 on length each
        let key = encHex.parse("0123456789abcdef0123456789abcdef");
        let iv = encHex.parse("abcdef9876543210abcdef9876543210");


        //4uwV4BHJvBs89+Fb7vM/oQ==

        // encrypt the message
        var CryptoJS = require("crypto-js");
        let encrypted = aes.encrypt(msg, key, { iv: iv, padding: padZeroPadding }).toString();
        let decrypt = aes.decrypt("4uwV4BHJvBs89+Fb7vM/oQ==", key, { iv: iv });

        cc.log(decrypt.toString(CryptoJS.enc.Utf8));

        /*var key = "e2610a2a34b26fb9";
        var iv = "447645551247fdf9f899c56df1defb7c";
        
        var CryptoJS = require("crypto-js");
        var encryptedToken = CryptoJS.AES.encrypt("QT+ee7HWO\/wCYsjal8LuDw==", key, { iv: iv }).toString();;
        cc.log(encryptedToken);
        
        var bytes = CryptoJS.AES.decrypt(encryptedToken, key, { iv: iv });
        var token = bytes.toString(CryptoJS.enc.Utf8);
        cc.log(token);
        */

        this.canvas = cc.find("Canvas");

        //\"userID\":34,\"1_detail_week_15\":\"3 - 2\",\"2_detail_week_30\":\"3 - 2\",
        //this.setItem("userID", 34); this.setItem("1_detail_week_15", "3 - 2"); this.setItem("2_detail_week_30", "3 - 2"); this.setItem("userName", "amir"); this.setItem("team", 2); this.setItem("lastRewardTime", '2019-06-20T08:33:56.000Z'); this.setItem("coin", 100000); if (this.callBackNode != null) this.callBackNode.emit('load-db');
        //this.data = "{\"userName\":\"amir\",\"team\":2,\"lastRewardTime\":\"2019-06-20T08:33:56.000Z\",\"coin\":100000,\"1_week_0_score\":1,\"1_detail_week_1\":\"3 - 1\",\"1_week_1_score\":225,\"1_detail_week_2\":\"5 - 2\",\"1_week_2_score\":300}";
        //cc.sys.localStorage.clear();

        //cc.sys.localStorage.setItem("userID", 1);

        var user = cc.sys.localStorage.getItem("userID");
        if (user) {
            try {
                cc.find("Canvas/Login").destroy();
            } catch (e) { }
        }
        else return;

        if (this.data == "{}") {

            this.loadingNode = cc.instantiate(this.LoadingPrefab);
            this.canvas.addChild(this.loadingNode);

            this.loadDBFromServer();
        }
    },
    createCORSRequest: function (method, url) {
        var xhr = cc.loader.getXMLHttpRequest();
        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

        }
        return xhr;
    },
    loadDBFromServer: function () {

        var url = window.location.href + "getUser.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var arg = "user=" + cc.sys.localStorage.getItem("userID");

        try { xhr.send(arg); }
        catch (error) { cc.log(error); }

        xhr.onreadystatechange = this.xhrGetCallback;

        //this.data = cc.sys.localStorage.getItem("data");
    },

    xhrGetCallback: function (event) {
        var db = cc.director.getScene().getChildByName('DBStorage').getComponent("DBStorage");

        if (typeof event == 'undefined') {

            return;
        }
        if (event.currentTarget.readyState === 4 && (event.currentTarget.status >= 200 && event.currentTarget.status < 300)) {

            cc.log(this.responseText);

            if (this.responseText == "") { db.setItem("coin", 5000); } else db.data = this.responseText;

            db.setItem("lastLoginTime", db.getDateTime());
            db.save();

            if (db.callBackNode != null)
                db.callBackNode.emit('load-db');

            db.loadingNode.destroy();
        }
    },

    onLoad() {
        //this.resetAll();
        //if(this.getItem("coin", -1) == -1)
        //this.setItem("coin", 4987);

        //cc.log(this.data);
    },

    resetAll: function () {
        this.data = "{}";
    },

    getItem: function (key) {
        var obj = JSON.parse(this.data);
        return obj[key];
    },

    getItem: function (key, defaultValue) {
        var obj = JSON.parse(this.data);
        var out = obj[key];
        if (out == null) out = defaultValue;
        return out;
    },

    setItem: function (key, value) {
        var obj = JSON.parse(this.data);
        obj[key] = value;
        var data = JSON.stringify(obj);

        this.data = data;

        cc.log(this.data);

        return data;
    },

    getDateTime() {
        var xmlHttp;
        function srvTime() {
            try {
                //FF, Opera, Safari, Chrome
                xmlHttp = new XMLHttpRequest();
            }
            catch (err1) {
                //IE
                try {
                    xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
                }
                catch (err2) {
                    try {
                        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
                    }
                    catch (eerr3) {
                        //AJAX not supported, use CPU time.
                        alert("AJAX not supported");
                    }
                }
            }
            xmlHttp.open('HEAD', window.location.href.toString(), false);
            xmlHttp.setRequestHeader("Content-Type", "text/html");
            xmlHttp.send('');
            return xmlHttp.getResponseHeader("Date");
        }

        var st = srvTime();
        var date = new Date(st);
        return date;
    },

    save: function () {
        var url = window.location.href + "updateUser.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        var CryptoJS = require("crypto-js");
        var encrypted = cc.sys.localStorage.getItem("token");
        var bytes = CryptoJS.AES.decrypt(encrypted, 'sd1bfI8Puqj0&!jdvqL');
        var token = bytes.toString(CryptoJS.enc.Utf8);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var arg = "user=" + cc.sys.localStorage.getItem("userID") + "&data=" + this.data + "&token=" + token;

        xhr.send(arg);
    },
});
