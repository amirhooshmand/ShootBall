cc.Class({
    extends: cc.Component,

    properties: {
        StorePrefab: {
            default: null,
            type: cc.Prefab,
        },
        dialogPrefab: {
            default: null,
            type: cc.Prefab,
        },
        LoadingPrefab: {
            default: null,
            type: cc.Prefab,
        },

        homeTeam: 0,
        awayTeam: 0,
        leagueName: "",
        weekName: "",
        gameDetail: "",
    },

    // onLoad () {},

    start() {
        this.DBStorage = cc.find("DBStorage").getComponent("DBStorage");

        this.weekName = "";
        this.homeTeam = this.DBStorage.getItem("team");
        this.awayTeam = this.gameDetail.awayID;

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

        bubble.getChildByName("dec").getComponent(cc.Label).string = this.replaceNum("برای بردن به " + (this.gameDetail.awayGoal - this.gameDetail.homeGoal + 1) + " گل\nنیاز دارید");


        var defCount = this.DBStorage.getItem("removeDefender", 1);
        var fireCount = this.DBStorage.getItem("fireBall", 1);
        var exteraBall = this.DBStorage.getItem("exteraBall", 1);
        var freezGoalKeeper = this.DBStorage.getItem("freezGoalKeeper", 1);

        this.updateFooter(defCount, fireCount, exteraBall, freezGoalKeeper);

        this.setCoin();
    },

    updateFooter: function (defCount, fireCount, exteraBall, freezGoalKeeper) {
        var footer = this.node.getChildByName("footer");

        footer.getChildByName("ShopItem1").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(defCount.toString());
        footer.getChildByName("ShopItem2").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(fireCount.toString());
        footer.getChildByName("ShopItem3").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(exteraBall.toString());
        footer.getChildByName("ShopItem4").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(freezGoalKeeper.toString());
    },

    setCoin: function () {
        var coin = this.DBStorage.getItem("coin", 0);

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
        this.gameDetail.homeID = this.homeTeam;
        this.gameDetail.defCount = this.DBStorage.getItem("removeDefender", 1);
        this.gameDetail.fireCount = this.DBStorage.getItem("fireBall", 1);
        this.gameDetail.exteraBall = this.DBStorage.getItem("exteraBall", 1);
        this.gameDetail.freezGoalKeeper = this.DBStorage.getItem("freezGoalKeeper", 1);

        const loadingNode = cc.instantiate(this.LoadingPrefab);
        this.canvas.addChild(loadingNode);
        var datas = this.gameDetail;

        if (this.gameDetail.id == 1)
            cc.director.loadScene("Level1-1", function (err, data) {
                var loginNode = cc.director.getScene();
                var containerLogin = loginNode.getChildByName('Canvas').getChildByName('GameManager');

                containerLogin.getComponent("GameManager").gameDetail = datas;
                cc.log(containerLogin.name);
            });
        else cc.director.loadScene("Level1-2");
    },

    getSceneName: function () {
        //console.log(cc.game._sceneInfos)
        //console.log(cc.director._scene._id)
        var sceneName
        var _sceneInfos = cc.game._sceneInfos
        for (var i = 0; i < _sceneInfos.length; i++) {
            if (_sceneInfos[i].uuid == cc.director._scene._id) {
                sceneName = _sceneInfos[i].url
                sceneName = sceneName.substring(sceneName.lastIndexOf('/') + 1).match(/[^\.]+/)[0]
            }

        }

        return sceneName
    },


    onItemClick: function (event, id) {
        var coin = this.DBStorage.getItem("coin", 0);

        var defCount = this.DBStorage.getItem("removeDefender", 1);
        var fireCount = this.DBStorage.getItem("fireBall", 1);
        var exteraBall = this.DBStorage.getItem("exteraBall", 1);
        var freezGoalKeeper = this.DBStorage.getItem("freezGoalKeeper", 1);

        if (id == 1 && coin >= 7500) { // defCount
            coin = 7500;
            defCount++;
            this.DBStorage.setItem("coin", coin);
            this.DBStorage.setItem("removeDefender", defCount);
        } else if (id == 2 && coin >= 5750) { // fireCount
            coin -= 5750;
            fireCount++;
            this.DBStorage.setItem("coin", coin);
            this.DBStorage.setItem("fireBall", fireCount);
        }
        else if (id == 3 && coin >= 2500) { // exteraBall
            coin -= 2500;
            exteraBall++;
            this.DBStorage.setItem("coin", coin);
            this.DBStorage.setItem("exteraBall", exteraBall);
        }
        else if (id == 4 && coin >= 1500) { // freezGoalKeeper
            coin -= 1500;
            freezGoalKeeper++;
            this.DBStorage.setItem("coin", coin);
            this.DBStorage.setItem("freezGoalKeeper", freezGoalKeeper);
        }
        else
            this.showMessage();

        this.updateFooter(defCount, fireCount, exteraBall, freezGoalKeeper);

        this.setCoin();
    },

    showMessage: function () {
        const dialog = cc.instantiate(this.dialogPrefab);
        cc.find("Canvas").addChild(dialog);
        var d = dialog.getComponent("Dialog");
        d.titleLable.string = ":( سکه نداری";
        d.bodyLable.string = "میخوای بری فروشگاه سکه بخری؟";
        d.positiveBtn.getComponentInChildren(cc.Label).string = "آره";
        d.negativeBtn.getComponentInChildren(cc.Label).string = "بیخیال";

        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //This node is the node to which your event handler code component belongs
        clickEventHandler.component = "PlayMatch";//This is the code file name
        clickEventHandler.handler = "goToShop";
        clickEventHandler.customEventData = 0;

        d.positiveBtn.clickEvents.push(clickEventHandler);
    },

    goToShop: function (event, customEventData) {
        const storeNode = cc.instantiate(this.StorePrefab);
        this.canvas.addChild(storeNode);

        storeNode.getComponent("Shop").callBackNode = this.node;
    },

});
