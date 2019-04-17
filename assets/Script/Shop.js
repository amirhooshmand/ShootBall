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
            coin += 500;
            this.DBStorage.setItem("coin", coin);
        } else if (id == 2) {
            coin += 1000;
            this.DBStorage.setItem("coin", coin);
        }
        else if (id == 3) {
            coin += 1500;
            this.DBStorage.setItem("coin", coin);
        }
        else if (id == 4) {
            coin += 10000;
            this.DBStorage.setItem("coin", coin);
        }
        this.showMessage("خرید موفق", "خرید با موفقیت انحام شد", " باشه");

        this.setCoin();
    },

    setCoin: function () {
        var coin = this.DBStorage.getItem("coin", 0);

        var coinBox = this.node.getChildByName("coin_box");
        coinBox.getComponentInChildren(cc.Label).string = this.replaceNum(coin.toString());

        if(this.callBackNode != null)
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


    close: function () {
        this.node.destroy();
    }
});
