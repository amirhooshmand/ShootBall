

cc.Class({
    extends: cc.Component,

    properties: {
        selectTeamPrefab: {
            default: null,
            type: cc.Prefab,
        },
        StorePrefab: {
            default: null,
            type: cc.Prefab,
        },
        leaderboardPrefab: {
            default: null,
            type: cc.Prefab
        },
        endMatchPrefab: {
            default: null,
            type: cc.Prefab
        },
        selectMatchPrefab: {
            default: null,
            type: cc.Prefab,
        },
        aboutUsPrefab: {
            default: null,
            type: cc.Prefab,
        },
        IntroPrefab: {
            default: null,
            type: cc.Prefab,
        },
        dailyRewardPrefab: {
            default: null,
            type: cc.Prefab,
        },
        diactiveBartarCup: {
            default: null,
            type: cc.SpriteFrame
        },
        diactiveHazfiCup: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    start() {




        //cc.log(window.orientation);
        window.scrollTo(0, 1);

        //this.DBStorage.setData("coin", 5500);

        //cc.log(this.DBStorage.getItem("coin", 545555));

        var teamManagerNode = cc.find("Canvas/TeamManager");
        this.teamManager = teamManagerNode.getComponent("TeamManager");
        this.DBStorage = cc.find("DBStorage").getComponent("DBStorage");

        /*for (var j = 0; j < this.teamManager.players.length; j++) {
                
                cc.loader.loadRes("player/body/" + this.teamManager.players[j].bodyColor, cc.SpriteFrame, function (err, spriteFrame) {
                });

                cc.loader.loadRes("player/head/" + this.teamManager.players[j].headName, cc.SpriteFrame, function (err, spriteFrame) {
                });

                cc.loader.loadRes("jersey/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                });
                
                cc.loader.loadRes("logo/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                });
            
        }*/


        //this.loadImage(0);

        this.canvas = cc.find("Canvas");

        var bartarCup = cc.find("Canvas/shelf_3/cup_bartar");
        var hazfiCup = cc.find("Canvas/shelf_3/cup_hazfi");


        this.DBStorage.callBackNode = this.node;

        var self = this;
        this.node.on('load-db', function () {
            cc.log(self.DBStorage.getItem(1 + "_detail_" + "week_" + 15));
            if (self.DBStorage.getItem(1 + "_detail_" + "week_" + 15) == null) {
                bartarCup.getComponent(cc.Sprite).spriteFrame = self.diactiveBartarCup;
                bartarCup.getComponent(cc.Button).interactable = false;
                hazfiCup.getChildByName("bartar").active = false;
            }
            else bartarCup.getComponent(cc.Sprite).enabled = false;

            if (self.DBStorage.getItem(2 + "_detail_" + "week_" + 30) == null) {
                hazfiCup.getComponent(cc.Sprite).spriteFrame = self.diactiveHazfiCup;
                hazfiCup.getComponent(cc.Button).interactable = false;
                hazfiCup.getChildByName("hazfi").active = false;
            }
            else hazfiCup.getComponent(cc.Sprite).enabled = false;


            cc.log("++ : " + self.DBStorage.data);
            if (self.DBStorage.getItem("team", -1) == -1) {
                const introNode = cc.instantiate(self.IntroPrefab);
                self.canvas.addChild(introNode);
            } else {
                self.setPlayer(self.DBStorage.getItem("team"));
                self.dailyCheck();
            }
        });

        if (this.DBStorage.getItem("team", -1) != -1)
            this.setPlayer(self.DBStorage.getItem("team"));

    },

    setPlayer: function (selectedteamID) {
        var playerSpine = cc.find("Canvas/shelf_2/Player/PlayerSpine").getComponent("PlayerOnMenu");
        playerSpine.setPlayer(selectedteamID);
    },

    dailyCheck() {
        var getCurrentTime = this.DBStorage.getDateTime();
        var getLastTime;
        if (this.DBStorage.getItem("lastRewardTime", '-1') != '-1')
            getLastTime = new Date(this.DBStorage.getItem("lastRewardTime"));
        else {
            this.DBStorage.setItem("lastRewardTime", getCurrentTime);
            this.DBStorage.save();
            return;
        }
        var diffSecond = (getCurrentTime - getLastTime) / 1000;

        var h = Math.floor(diffSecond / 3600);

        if (h >= 24) {
            const dailyNode = cc.instantiate(this.dailyRewardPrefab);
            this.canvas.addChild(dailyNode);

            this.DBStorage.setItem("lastRewardTime", getCurrentTime);
            this.DBStorage.save();
        }
    },

    loadImage: function (j) {
        //for (var j = 0; j < this.teamManager.players.length; j++) {
        if (j < this.teamManager.players.length) {
            var self = this;
            cc.loader.loadRes("player/body/" + this.teamManager.players[j].bodyColor, cc.SpriteFrame, function (err, spriteFrame) { });

            cc.loader.loadRes("player/head/" + this.teamManager.players[j].headName, cc.SpriteFrame, function (err, spriteFrame) { });
            cc.loader.loadRes("jersey/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                self.loadImage(++j);
            });

            cc.loader.loadRes("logo/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) { });
        }
        else {
            var loading = cc.find("Canvas/Loading");
            loading.destroy();
        }
    },

    aboutUsClick: function () {
        const storeNode = cc.instantiate(this.aboutUsPrefab);
        this.canvas.addChild(storeNode);
    },
    storeClick: function () {
        const storeNode = cc.instantiate(this.StorePrefab);
        this.canvas.addChild(storeNode);
    },
    teamSelectClick: function () {

        const selectTeamNode = cc.instantiate(this.selectTeamPrefab);
        this.canvas.addChild(selectTeamNode);
    },
    teamSelectClickFromIntro: function () {

        const selectTeamNode = cc.instantiate(this.selectTeamPrefab);
        this.canvas.addChild(selectTeamNode);
        selectTeamNode.getChildByName("Icon_back").destroy();
    },
    rubikupClick: function () {
        const selectMatchNode = cc.instantiate(this.selectMatchPrefab);
        this.canvas.addChild(selectMatchNode);
        selectMatchNode.getComponent("MatchList").cup = 1;
    },
    premierLeague_1Click: function () {
        const selectMatchNode = cc.instantiate(this.selectMatchPrefab);
        this.canvas.addChild(selectMatchNode);
        selectMatchNode.getComponent("MatchList").cup = 2;
    },
    cupClick: function () {
        const selectMatchNode = cc.instantiate(this.selectMatchPrefab);
        this.canvas.addChild(selectMatchNode);
        selectMatchNode.getComponent("MatchList").cup = 3;
    },
    leaderboardClick: function () {
        const leaderboardNode = cc.instantiate(this.leaderboardPrefab);
        this.canvas.addChild(leaderboardNode);
    },

    openEndMatch(detail, gameDetail) {
        this.canvas = cc.find("Canvas");

        const endMatchNode = cc.instantiate(this.endMatchPrefab);
        this.canvas.addChild(endMatchNode);

        endMatchNode.getComponent("EndMatch").detail = detail;
        endMatchNode.getComponent("EndMatch").gameDetail = gameDetail;
    }
});
