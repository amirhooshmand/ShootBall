cc.Class({
    extends: cc.Component,

    properties: {
        dialogPrefab: {
            default: null,
            type: cc.Prefab,
        },

        numberEditbox: cc.EditBox,
        verifyEditbox: cc.EditBox,
        nameEditbox: cc.EditBox,
    },

    start() {
        this.sendNumberNode = this.node.getChildByName("SendNumber");
        this.verifyNode = this.node.getChildByName("VerifyNumber");
        this.nameNode = this.node.getChildByName("Name");
        this.loading = this.node.getChildByName("BallLoading");

        this.verifyNode.active = false;
        this.nameNode.active = false;
        this.loading.active = false;

        //this.intiVerifyCode() ;
    },

    intiVerifyCode() {

        this.loading.active = false;

        this.verifyNode.active = true;


        var timeLbl = this.verifyNode.getChildByName("Time Label").getComponent(cc.Label);
        var ressendBtn = this.verifyNode.getChildByName("resend");
        ressendBtn.active = false;

        this.second = 120;

        timeLbl.string = this.replaceNum(this.convertToHHMMSS(this.second));

        // Time interval in units of seconds
        var interval = 1;
        // Time of repetition
        var repeat = this.second - 1;
        // Start delay
        var delay = 0;
        this.schedule(function () {
            this.second--;
            timeLbl.string = this.replaceNum(this.convertToHHMMSS(this.second));
            if (this.second == 0) {
                ressendBtn.active = true;

            }

        }, interval, repeat, delay);

    },

    initName() {
        this.loading.active = false;


        this.nameNode.active = true;
    },

    sendClick() {
        this.number = this.numberEditbox.string;
        this.sendNumber(this.numberEditbox.string);

        this.loading.active = true;
        this.sendNumberNode.active = false;
    },

    verifyClick() {
        this.sendVerifyCode(this.verifyEditbox.string, this.number);

        this.loading.active = true;
        this.verifyNode.active = false;
    },

    nameClick() {

        if (this.nameEditbox.string.length == 0) return;

        cc.sys.localStorage.setItem("name", this.nameEditbox.string);
        var user = cc.sys.localStorage.getItem("userID");
        this.sendName(user, this.nameEditbox.string);

        this.loading.active = true;
        this.nameNode.active = false;
    },

    resendSmsCode() {
        this.verifyNode.active = false;
        this.sendNumberNode.active = true;
    },

    endLogin() {
        cc.sys.localStorage.setItem("name", this.nameEditbox.string);
        cc.director.loadScene("StartMenu");
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
    sendVerifyCode: function (verify, number) {

        var url = window.location.href + "userLogin2.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var arg = "mobile=" + number + "&verify=" + verify;

        try { xhr.send(arg); }
        catch (error) { cc.log(error); }

        xhr.onreadystatechange = this.xhrGetCallback;
    },
    sendNumber: function (number) {

        var url = window.location.href + "userLogin.php";

        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var arg = "mobile=" + number;

        try { xhr.send(arg); }
        catch (error) { cc.log(error); }

        xhr.onreadystatechange = this.xhrGetCallback;
    },
    sendName: function (user, name) {
        var url = window.location.href + "userLogin3.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var CryptoJS = require("crypto-js");
        var encrypted = cc.sys.localStorage.getItem("token");
        var bytes = CryptoJS.AES.decrypt(encrypted, 'sd1bfI8Puqj0&!jdvqL');
        var token = bytes.toString(CryptoJS.enc.Utf8);

        var arg = "user=" + user + "&name=" + name + "&token=" + token;

        try { xhr.send(arg); }
        catch (error) { cc.log(error); }

        xhr.onreadystatechange = this.xhrGetCallback;
    },

    codeWrong() {
        this.loading.active = false;
        this.verifyNode.active = true;
        this.showMessage("خطا", "کد و اشتباه وارد کردی", " حله");
    },

    xhrGetCallback: function (event) {
        var login = cc.director.getScene().getChildByName('Canvas').getChildByName('Login').getComponent("Login");

        if (typeof event == 'undefined') {

            return;
        }
        if (event.currentTarget.readyState === 4 && (event.currentTarget.status >= 200 && event.currentTarget.status < 300)) {


            cc.log(this.responseText);
            var obj = JSON.parse(this.responseText);

            if (obj.status == "code sent") {
                login.intiVerifyCode();
            }
            if (obj.status == "code wrong") {
                login.codeWrong();
            }
            else if (obj.id) {
                cc.sys.localStorage.clear();

                cc.sys.localStorage.setItem("userID", obj.id);

                var CryptoJS = require("crypto-js");
                var encryptedToken = CryptoJS.AES.encrypt(obj.token, 'sd1bfI8Puqj0&!jdvqL').toString();;
                cc.sys.localStorage.setItem("token", encryptedToken);

                if (obj.name != null)
                    login.nameEditbox.string = obj.name;

                login.initName();
            }
            if (obj.status == "user name updated") {
                login.endLogin();
            }
        }
    },

    replaceNum: function (input) {//۱۲۳۴۵۶۷۸۹۰
        return input.replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
    },

    convertToHHMMSS: function (totalSeconds) {
        var h = Math.floor(totalSeconds / 3600);
        var m = Math.floor((totalSeconds % 3600) / 60);
        var s = Math.floor((totalSeconds % 3600) % 60);

        var hourStr = (h == 0) ? "" : this.DoubleDigitFormat(h) + ":";
        var minuteStr = this.DoubleDigitFormat(m) + ":";
        var secondsStr = this.DoubleDigitFormat(s);

        return hourStr + minuteStr + secondsStr;
    },

    DoubleDigitFormat: function (num) {
        if (num < 10) {
            return ("0" + num);
        }
        return num.toString();
    },

    showMessage: function (title, message, btntxt) {
        const dialog = cc.instantiate(this.dialogPrefab);
        cc.find("Canvas").addChild(dialog);
        var d = dialog.getComponent("Dialog");
        d.titleLable.string = title;
        d.bodyLable.string = message;
        d.positiveBtn.getComponentInChildren(cc.Label).string = btntxt;
        //d.negativeBtn.getComponentInChildren(cc.Label).string = "بیخیال";
        d.negativeBtn.node.destroy();
    },

});
