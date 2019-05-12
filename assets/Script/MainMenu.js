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


        this.loadImage(0);

        this.canvas = cc.find("Canvas");

        var bartarCup = cc.find("Canvas/shelf_3/cup_bartar");
        var hazfiCup = cc.find("Canvas/shelf_3/cup_hazfi");

        if (this.DBStorage.getItem(1 + "_detail_" + "week_" + 15) == null) {
            bartarCup.getComponent(cc.Sprite).spriteFrame = this.diactiveBartarCup;
            bartarCup.getComponent(cc.Button).interactable = false;
        }
        if (this.DBStorage.getItem(2 + "_detail_" + "week_" + 30) == null) {
            hazfiCup.getComponent(cc.Sprite).spriteFrame = this.diactiveHazfiCup;
            hazfiCup.getComponent(cc.Button).interactable = false;
        }
        this.DBStorage.callBackNode = this.node;

        var self = this;
        this.node.on('load-db', function () {
            self.setPlayer(self.DBStorage.getItem("team"));
        });
    },

    setPlayer: function (selectedteamID) {
        var playerSpine = cc.find("Canvas/shelf_2/Player/PlayerSpine").getComponent("PlayerOnMenu");
        playerSpine.setPlayer(selectedteamID);
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

    },
    storeClick: function () {
        const storeNode = cc.instantiate(this.StorePrefab);
        this.canvas.addChild(storeNode);
    },
    teamSelectClick: function () {

        const selectTeamNode = cc.instantiate(this.selectTeamPrefab);
        this.canvas.addChild(selectTeamNode);
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

    openEndMatch(gameDetail) {
        this.canvas = cc.find("Canvas");

        const endMatchNode = cc.instantiate(this.endMatchPrefab);
        this.canvas.addChild(endMatchNode);

        endMatchNode.getComponent("EndMatch").gameDetail = gameDetail;
    }
});
