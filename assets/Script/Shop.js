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


        if (id == 1) {
            this.openPaymentPage(6000);
        } else if (id == 2) {
            this.openPaymentPage(23000);
        }
        else if (id == 3) {
            this.openPaymentPage(45000);
        }
        else if (id == 4) {
            this.openPaymentPage(70000);
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
    openPaymentPage: function (amount) {
        var user = cc.sys.localStorage.getItem("userID");

        var arg = "amount=" + amount + "&user=" + user+"&url=" + window.location.href + "afterZarinpalPayment.php";
        var url = window.location.href + "sendToZarinpalPayment.php?" + arg;
        window.open(url, "_self");
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
