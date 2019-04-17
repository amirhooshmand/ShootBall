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
        selectMatchPrefab: {
            default: null,
            type: cc.Prefab,
        },
        diactiveBartarCup:{
            default: null,
            type:cc.SpriteFrame
        },
        diactiveHazfiCup:{
            default: null,
            type:cc.SpriteFrame
        }
    },

    start() {

        //cc.find("DBStorage").getComponent("DBStorage").setData("coin", 5500);

        //cc.log(cc.find("DBStorage").getComponent("DBStorage").getItem("coin", 545555));

        var teamManagerNode = cc.find("Canvas/TeamManager");
        this.teamManager = teamManagerNode.getComponent("TeamManager");

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

        this.canvas = cc.find("Canvas");

        var bartarCup = cc.find("Canvas/shelf_3/cup_bartar");
        var hazfiCup = cc.find("Canvas/shelf_3/cup_hazfi");

        if(cc.find("DBStorage").getComponent("DBStorage").getItem(1 + "_detail_" + "week_" + 15) == null)
        {
            bartarCup.getComponent(cc.Sprite).spriteFrame = this.diactiveBartarCup;
            bartarCup.getComponent(cc.Button).interactable = false;
        }
        if(cc.find("DBStorage").getComponent("DBStorage").getItem(2 + "_detail_" + "week_" + 30) == null)
        {
            hazfiCup.getComponent(cc.Sprite).spriteFrame = this.diactiveHazfiCup;
            hazfiCup.getComponent(cc.Button).interactable = false;
        }
        this.setPlayer(cc.find("DBStorage").getComponent("DBStorage").getItem("team"));
    },

    setPlayer: function(selectedteamID)
    {
        var playerSpine = cc.find("Canvas/shelf_2/Player/PlayerSpine").getComponent("PlayerOnMenu");
        playerSpine.setPlayer(selectedteamID);
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
    premierLeague_2Click: function () {
        const selectMatchNode = cc.instantiate(this.selectMatchPrefab);
        this.canvas.addChild(selectMatchNode);
        selectMatchNode.getComponent("MatchList").cup = 4;
    }
});
