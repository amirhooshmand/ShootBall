cc.Class({
    extends: cc.Component,

    properties: {
        matchPrefab: {
            default: null,
            type: cc.Prefab,
        },

        cupSprites: {
            default: [],
            type: cc.SpriteFrame
        },

        matchItems:
        {
            default: [],
            type: cc.Node
        },
        cup: 1,
    },

    start() {
        var teamManagerNode = cc.find("Canvas/TeamManager");
        this.teamManager = teamManagerNode.getComponent("TeamManager");

        var content = cc.find("Canvas/MatchList/view/content");

        var weekCount = 0;


        var cupNode = this.node.getChildByName("cup_bartar");
        cupNode.getComponent(cc.Sprite).spriteFrame = this.cupSprites[this.cup - 1];
        cupNode.width = this.cupSprites[this.cup - 1].getRect().width;
        cupNode.height = this.cupSprites[this.cup - 1].getRect().height;

        var currentLvl = 1;
        this.lastPlayer = null;
        cc.sys.localStorage.setItem(this.cup + "_" + "week_" + weekCount, 1);
        for (var i = 0; i < this.teamManager.teams.length; i++) {
            if (this.teamManager.teams[i].id != cc.sys.localStorage.getItem("team")) {

                weekCount++;

                const match = cc.instantiate(this.matchPrefab);
                content.addChild(match);
                this.matchItems.push(match);

                match.getChildByName("WeekLbl").getComponent(cc.Label).string = " هفته " + weekCount;
                cc.loader.loadRes("logo/" + cc.sys.localStorage.getItem("team"), cc.SpriteFrame, function (err, spriteFrame) {
                    match.getChildByName("score_box").getChildByName("homeLogo").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });

                cc.loader.loadRes("logo/" + this.teamManager.teams[i].id, cc.SpriteFrame, function (err, spriteFrame) {
                    match.getChildByName("score_box").getChildByName("awayLogo").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });

                var player = match.getChildByName("Player")
                this.setPlayer(player);


                if (cc.sys.localStorage.getItem(this.cup + "_" + "week_" + (weekCount - 1)) == 1) {
                    if (this.lastPlayer != null)
                        this.activePlayer(this.lastPlayer, false);

                    if(cc.sys.localStorage.getItem(this.cup + "_detail_" + "week_" + weekCount) == null)
                        match.getChildByName("score_box").getChildByName("ResultLbl").getComponent(cc.Label).string = "شروع";
                    else
                        match.getChildByName("score_box").getChildByName("ResultLbl").getComponent(cc.Label).string = cc.sys.localStorage.getItem(this.cup + "_detail_" + "week_" + weekCount);

                    this.lastPlayer = player;
                    currentLvl = weekCount;
                }
                else this.activePlayer(player, false);

                var button = match.getComponent(cc.Button);
                //if (pruches != "yes") {
                //button.node.getChildByName("BtnLbl").getComponent(cc.Label).string = "سکه  " + this.teamManager.teams[i].price + "  ";
                //}

                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node; //This node is the node to which your event handler code component belongs
                clickEventHandler.component = "MatchList";//This is the code file name
                clickEventHandler.handler = "matchClick";
                clickEventHandler.customEventData = weekCount;

                button.clickEvents.push(clickEventHandler);
            }
        }

         this.node.getComponent(cc.ScrollView).scrollToPercentVertical(1/16, 1);
        //this.node.getComponent(cc.ScrollView).scrollToBottom(1);
    },

    matchClick: function (event, customEventData) {

        if (cc.sys.localStorage.getItem(this.cup + "_" + "week_" + (customEventData - 1)) == 1) {
            this.activePlayer(this.lastPlayer, false);

            var player = this.matchItems[customEventData - 1].getChildByName("Player");
            this.lastPlayer = player;
            this.activePlayer(player, true);
        }
    },

    setPlayer: function (player) {
        for (var j = 0; j < this.teamManager.players.length; j++) {
            if (this.teamManager.players[j].teamID == cc.sys.localStorage.getItem("team")) {
                //var player = cc.find("Canvas/shelf_2/Player");
                player.getChildByName("jersey").getChildByName("numberLbl").getComponent(cc.Label).string = this.teamManager.players[j].number;

                cc.loader.loadRes("player/body/" + this.teamManager.players[j].bodyColor, cc.SpriteFrame, function (err, spriteFrame) {
                    player.getChildByName("body").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });

                cc.loader.loadRes("player/head/" + this.teamManager.players[j].headName, cc.SpriteFrame, function (err, spriteFrame) {
                    player.getChildByName("head").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });

                cc.loader.loadRes("jersey/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                    player.getChildByName("jersey").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                return;
            }
        }
    },

    activePlayer: function (player, flag) {
        player.active = flag;
    },

    close:function()
    {
        this.node.destroy();
    }
});
