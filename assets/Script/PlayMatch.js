cc.Class({
    extends: cc.Component,

    properties: {
        StorePrefab: {
            default: null,
            type: cc.Prefab,
        },

        homeTeam: 0,
        awayTeam: 0,
        leagueName: "",
        weekName: "",
        goal: 0,
    },

    // onLoad () {},

    start() {
        var teamManagerNode = cc.find("Canvas/TeamManager");
        this.teamManager = teamManagerNode.getComponent("TeamManager");
        this.canvas = cc.find("Canvas");

        var scoreBoard = this.node.getChildByName("stadium_scoreboard");

        var self = this;
        this.node.on('change-coin', function () {
            self.setCoin();
        });

        cc.loader.loadRes("logo/" + this.homeTeam, cc.SpriteFrame, function (err, spriteFrame) {
            scoreBoard.getChildByName("HomeLogo").getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

        cc.loader.loadRes("logo/" + this.awayTeam, cc.SpriteFrame, function (err, spriteFrame) {
            scoreBoard.getChildByName("AwayLogo").getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        scoreBoard.getChildByName("HomeLable").getComponent(cc.Label).string = this.teamManager.teams[this.homeTeam].name;
        scoreBoard.getChildByName("AwayLable").getComponent(cc.Label).string = this.teamManager.teams[this.awayTeam].name;

        scoreBoard.getChildByName("leagueName").getComponent(cc.Label).string = this.leagueName;
        scoreBoard.getChildByName("weekLable").getComponent(cc.Label).string = this.replaceNum(this.weekName);

        var bubble = this.node.getChildByName("speech_bubble");

        bubble.getChildByName("dec").getComponent(cc.Label).string = this.replaceNum("برای بردن به " + this.goal + " گل\nنیاز دارید");

        var footer = this.node.getChildByName("footer");

        var defCount = cc.find("DBStorage").getComponent("DBStorage").getItem("removeDefender", 1);
        var fireCount = cc.find("DBStorage").getComponent("DBStorage").getItem("fireBall", 1);
        var exteraBall = cc.find("DBStorage").getComponent("DBStorage").getItem("exteraBall", 1);
        var freezGoalKeeper = cc.find("DBStorage").getComponent("DBStorage").getItem("freezGoalKeeper", 1);

        footer.getChildByName("ShopItem1").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(defCount.toString());
        footer.getChildByName("ShopItem2").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(fireCount.toString());
        footer.getChildByName("ShopItem3").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(exteraBall.toString());
        footer.getChildByName("ShopItem4").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(freezGoalKeeper.toString());

        this.setCoin();
    },

    setCoin: function () {
        var coin = cc.find("DBStorage").getComponent("DBStorage").getItem("coin", 0);

        var coinBox = this.node.getChildByName("coin_box");
        coinBox.getComponentInChildren(cc.Label).string = this.replaceNum(coin.toString());
    },

    replaceNum: function (input) {//۱۲۳۴۵۶۷۸۹۰
        return input.replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
    },

    closeClick: function () {
        this.node.destroy();
    },

    playClick: function () {
        cc.log(this.weekName);
        if (this.weekName == "هفته 1")
            cc.director.loadScene("Level1-1");
        else cc.director.loadScene("Level1-2");
    },

    goToShop: function (event, customEventData) {
        const storeNode = cc.instantiate(this.StorePrefab);
        this.canvas.addChild(storeNode);

        storeNode.getComponent("Shop").callBackNode = this.node;
    },

});
