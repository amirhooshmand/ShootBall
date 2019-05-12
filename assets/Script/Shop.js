cc.Class({
    extends: cc.Component,

    properties: {
        dialogPrefab: {
            default: null,
            type: cc.Prefab,
        },
        callBackNode: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.DBStorage = cc.find("DBStorage").getComponent("DBStorage");

        this.setCoin();
    },


    onItemClick: function (event, id) {
        var coin = this.DBStorage.getItem("coin", 0);


        var userToken = androidApp.getUserToken();

        this.scheduleOnce(function () {
            this.checkPayment(userToken, this.orderID, this.paymentToken);
        }, 5);

        this.orderID = (Math.floor(Math.random() * 99999999));

        this.itemPending = id;

        if (id == 1) {
            this.openPaymentPage(userToken, this.orderID, 100);
        } else if (id == 2) {
            this.openPaymentPage(userToken, this.orderID, 100);
        }
        else if (id == 3) {
            this.openPaymentPage(userToken, this.orderID, 100);
        }
        else if (id == 4) {
            this.openPaymentPage(userToken, this.orderID, 100);
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
    openPaymentPage: function (userToken, orderID, amount) {

        var url = "http://rubika1.rakhtkan.net/getPaymentApi.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        var arg = "user_token=" + userToken + "&app_token=NGDLPYOULRCSIQJBFSGITSTGCLQQYQDBEPDAZYAYBQFWOIOYZGRLOIHUNXJDHXWU&order_id=" + orderID + "&amount=" + amount;

        try { xhr.send(arg); }
        catch (error) { cc.log(error); }

        xhr.onreadystatechange = this.xhrPaymentCallback;

        //this.data = cc.sys.localStorage.getItem("data");
    },

    xhrPaymentCallback: function (event) {
        var db = cc.director.getScene().getChildByName('Canvas').getChildByName('Shop').getComponent("Shop");

        if (typeof event == 'undefined') {
            return;
        }
        if (event.currentTarget.readyState === 4 && (event.currentTarget.status >= 200 && event.currentTarget.status < 300)) {
            var json = JSON.parse(this.responseText);

            db.paymentToken = json.data.payment_token;

            var payment_token = json.data.payment_token;
            androidApp.clientAction(
                '{"track_id":"my-payment","type":"Payment","button_payment":{"button_payment_token":"' +
                payment_token + '"},"title":"پرداخت"}');
        }
    },
    checkPayment: function (userToken, orderID, paymentToken) {

        var url = "http://rubika1.rakhtkan.net/getPaymentStatusApi.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var arg = "user_token=" + userToken + "&app_token=NGDLPYOULRCSIQJBFSGITSTGCLQQYQDBEPDAZYAYBQFWOIOYZGRLOIHUNXJDHXWU&order_id=" + orderID + "&payment_token=" + paymentToken;

        try { xhr.send(arg); }
        catch (error) { cc.log(error); }

        xhr.onreadystatechange = this.xhrCheckPaymentCallback;

        //this.data = cc.sys.localStorage.getItem("data");
    },

    xhrCheckPaymentCallback: function (event) {
        var db = cc.director.getScene().getChildByName('Canvas').getChildByName('Shop').getComponent("Shop");

        if (typeof event == 'undefined') {
            return;
        }
        if (event.currentTarget.readyState === 4 && (event.currentTarget.status >= 200 && event.currentTarget.status < 300)) {

            var json = JSON.parse(this.responseText);
            if (json.data.status == "Done") {
                db.showMessage("خرید موفق", "خرید با موفقیت انحام شد", " باشه");
                var coin = db.DBStorage.getItem("coin", 0);

                if (db.itemPending == 1) {
                    coin += 5000;
                } else if (db.itemPending == 2) {
                    coin += 20000;
                }
                else if (db.itemPending == 3) {
                    coin += 45000;
                }
                else if (db.itemPending == 4) {
                    coin += 80000;
                }
                db.DBStorage.setItem("coin", coin);
                db.DBStorage.save();

                db.setCoin();
            }
            //
        }
    },

    setCoin: function () {
        var coin = this.DBStorage.getItem("coin", 0);

        var coinBox = this.node.getChildByName("coin_box");
        coinBox.getComponentInChildren(cc.Label).string = this.replaceNum(coin.toString());

        if (this.callBackNode != null)
            this.callBackNode.emit('change-coin');
    },
    replaceNum: function (input) {//۱۲۳۴۵۶۷۸۹۰
        return input.replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
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

    clientResponse(s) {
        var db = cc.director.getScene().getChildByName('Canvas').getChildByName('Shop').getComponent("Shop");
        db.showMessage("ss", s.toString(), "باشه");
    },

    close: function () {
        this.node.destroy();
    }
});
