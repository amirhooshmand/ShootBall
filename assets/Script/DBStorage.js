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
        this.canvas = cc.find("Canvas");

        this.setItem("userID", 34); this.setItem("1_detail_week_15", "3 - 2"); this.setItem("2_detail_week_30", "3 - 2"); this.setItem("userName", "amir"); this.setItem("team", 2); this.setItem("lastRewardTime", '2019-06-20T08:33:56.000Z'); this.setItem("coin", 100000); if (this.callBackNode != null) this.callBackNode.emit('load-db');

        if (this.data == "{}") {
            var userToken = androidApp.getUserToken(); //2508ppktfuxpnefmuiugqinpxyrkmvlm
            this.getUserData(userToken);
        }

        var CryptoJS = require("crypto-js");

        var encrypted = CryptoJS.AES.encrypt("amir hossein سییب", 'Secret Passphrase').toString();;

        var bytes = CryptoJS.AES.decrypt(encrypted, 'Secret Passphrase');
        var decrypted = bytes.toString(CryptoJS.enc.Utf8);

        //cc.log(encrypted);
        //cc.log(decrypted);
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

        var url = "http://rubika1.rakhtkan.net/getUser.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var arg = "user_id=" + this.getItem("userID");

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

            if (this.responseText == "0 results") { db.setItem("coin", 5000); } else db.data = this.responseText;

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

    getUserData: function (userToken) {
        this.loadingNode = cc.instantiate(this.LoadingPrefab);
        this.canvas.addChild(this.loadingNode);

        var url = "http://rubika1.rakhtkan.net/getUserData.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var arg = "user_token=" + userToken + "&app_token=NGDLPYOULRCSIQJBFSGITSTGCLQQYQDBEPDAZYAYBQFWOIOYZGRLOIHUNXJDHXWU";

        try { xhr.send(arg); }
        catch (error) { cc.log(error); }

        xhr.onreadystatechange = this.xhrGetUserCallback;
    },

    xhrGetUserCallback: function (event) {
        var db = cc.director.getScene().getChildByName('DBStorage').getComponent("DBStorage");
        if (typeof event == 'undefined') {

            return;
        }
        if (event.currentTarget.readyState === 4 && (event.currentTarget.status >= 200 && event.currentTarget.status < 300)) {
            var json = JSON.parse(this.responseText);

            //{"status":"OK","status_det":"OK","data":{"status":"Done","user_data":{"user_id":"827023719","name":"","family":"","username":"amir_hosh"}}}


            db.setItem("userID", json.data.user_data.user_id);
            db.setItem("userName", json.data.user_data.username);
            if (json.data.user_data.name != "")
                db.setItem("name", json.data.user_data.name);

            db.loadDBFromServer();
        }
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
        var url = "http://rubika1.rakhtkan.net/userUpdate.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var arg = "user_id=" + this.getItem("userID") + "&data=" + this.data;
        xhr.send(arg);
    },
});
