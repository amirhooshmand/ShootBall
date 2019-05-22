cc.Class({
    extends: cc.Component,

    properties: {
        matchPrefab: {
            default: null,
            type: cc.Prefab,
        },

        playMatchPrefab: {
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

        this.DBStorage = cc.find("DBStorage").getComponent("DBStorage");

        this.rubicup = [];
        this.rubicup.push({ id: 1, ballCount: 3, homeGoal: 0, awayGoal: 1, awayID: 2, time: 0 });
        this.rubicup.push({ id: 2, ballCount: 5, homeGoal: 0, awayGoal: 2, awayID: 3, time: 0 });
        this.rubicup.push({ id: 3, ballCount: 6, homeGoal: 0, awayGoal: 3, awayID: 6, time: 0 });
        this.rubicup.push({ id: 4, ballCount: 8, homeGoal: 0, awayGoal: 3, awayID: 8, time: 0 });
        this.rubicup.push({ id: 5, ballCount: 5, homeGoal: 0, awayGoal: 2, awayID: 7, time: 0 });
        this.rubicup.push({ id: 6, ballCount: 8, homeGoal: 0, awayGoal: 2, awayID: 9, time: 0 });
        this.rubicup.push({ id: 7, ballCount: 7, homeGoal: 0, awayGoal: 1, awayID: 0, time: 0 });
        this.rubicup.push({ id: 8, ballCount: 4, homeGoal: 0, awayGoal: 4, awayID: 10, time: 55 });
        this.rubicup.push({ id: 9, ballCount: 9, homeGoal: 0, awayGoal: 3, awayID: 11, time: 0 });
        this.rubicup.push({ id: 10, ballCount: 5, homeGoal: 0, awayGoal: 3, awayID: 12, time: 0 });
        this.rubicup.push({ id: 11, ballCount: 7, homeGoal: 0, awayGoal: 3, awayID: 4, time: 0 });
        this.rubicup.push({ id: 12, ballCount: 7, homeGoal: 0, awayGoal: 3, awayID: 13, time: 0 });
        this.rubicup.push({ id: 13, ballCount: 10, homeGoal: 0, awayGoal: 3, awayID: 1, time: 50 });
        this.rubicup.push({ id: 14, ballCount: 5, homeGoal: 0, awayGoal: 2, awayID: 5, time: 0 });
        this.rubicup.push({ id: 15, ballCount: 6, homeGoal: 0, awayGoal: 2, awayID: 15, time: 0 });

        this.league = [];
        this.league.push({ id: 1, ballCount: 10, homeGoal: 0, awayGoal: 3, awayID: 6, time: 50 });
        this.league.push({ id: 2, ballCount: 6, homeGoal: 0, awayGoal: 4, awayID: 8, time: 0 });
        this.league.push({ id: 3, ballCount: 5, homeGoal: 0, awayGoal: 3, awayID: 9, time: 0 });
        this.league.push({ id: 4, ballCount: 6, homeGoal: 0, awayGoal: 3, awayID: 2, time: 0 });
        this.league.push({ id: 5, ballCount: 3, homeGoal: 0, awayGoal: 4, awayID: 15, time: 0 });
        this.league.push({ id: 6, ballCount: 6, homeGoal: 0, awayGoal: 4, awayID: 0, time: 55 });
        this.league.push({ id: 7, ballCount: 4, homeGoal: 0, awayGoal: 3, awayID: 3, time: 0 });
        this.league.push({ id: 8, ballCount: 5, homeGoal: 0, awayGoal: 4, awayID: 4, time: 0 });
        this.league.push({ id: 9, ballCount: 5, homeGoal: 0, awayGoal: 3, awayID: 12, time: 0 });
        this.league.push({ id: 10, ballCount: 9, homeGoal: 0, awayGoal: 4, awayID: 10, time: 50 });
        this.league.push({ id: 11, ballCount: 10, homeGoal: 0, awayGoal: 3, awayID: 13, time: 0 });
        this.league.push({ id: 12, ballCount: 7, homeGoal: 0, awayGoal: 1, awayID: 1, time: 55 });
        this.league.push({ id: 13, ballCount: 4, homeGoal: 0, awayGoal: 5, awayID: 11, time: 0 });
        this.league.push({ id: 14, ballCount: 10, homeGoal: 0, awayGoal: 4, awayID: 5, time: 0 });
        this.league.push({ id: 15, ballCount: 9, homeGoal: 0, awayGoal: 3, awayID: 7, time: 0 });

        this.league.push({ id: 16, ballCount: 11, homeGoal: 0, awayGoal: 4, awayID: 6, time: 30 });
        this.league.push({ id: 17, ballCount: 4, homeGoal: 0, awayGoal: 5, awayID: 8, time: 0 });
        this.league.push({ id: 18, ballCount: 8, homeGoal: 0, awayGoal: 3, awayID: 9, time: 0 });
        this.league.push({ id: 19, ballCount: 11, homeGoal: 0, awayGoal: 2, awayID: 2, time: 0 });
        this.league.push({ id: 20, ballCount: 8, homeGoal: 0, awayGoal: 4, awayID: 15, time: 0 });
        this.league.push({ id: 21, ballCount: 11, homeGoal: 0, awayGoal: 4, awayID: 0, time: 0 });
        this.league.push({ id: 22, ballCount: 11, homeGoal: 0, awayGoal: 7, awayID: 3, time: 0 });
        this.league.push({ id: 23, ballCount: 3, homeGoal: 0, awayGoal: 7, awayID: 4, time: 0 });
        this.league.push({ id: 24, ballCount: 6, homeGoal: 0, awayGoal: 5, awayID: 12, time: 0 });
        this.league.push({ id: 25, ballCount: 1, homeGoal: 0, awayGoal: 10, awayID: 10, time: 0 });
        this.league.push({ id: 26, ballCount: 5, homeGoal: 0, awayGoal: 2, awayID: 13, time: 45 });
        this.league.push({ id: 27, ballCount: 9, homeGoal: 0, awayGoal: 5, awayID: 1, time: 0 });
        this.league.push({ id: 28, ballCount: 9, homeGoal: 0, awayGoal: 4, awayID: 11, time: 0 });
        this.league.push({ id: 29, ballCount: 11, homeGoal: 0, awayGoal: 5, awayID: 5, time: 0 });
        this.league.push({ id: 30, ballCount: 10, homeGoal: 0, awayGoal: 5, awayID: 7, time: 70 });

        this.hazfi = [];
        this.hazfi.push({ id: 1, ballCount: 5, homeGoal: 0, awayGoal: 3, awayID: 8, time: 0 });
        this.hazfi.push({ id: 2, ballCount: 10, homeGoal: 0, awayGoal: 4, awayID: 2, time: 0 });
        this.hazfi.push({ id: 3, ballCount: 12, homeGoal: 0, awayGoal: 5, awayID: 3, time: 0 });
        this.hazfi.push({ id: 4, ballCount: 10, homeGoal: 0, awayGoal: 3, awayID: 13, time: 0 });
        this.hazfi.push({ id: 5, ballCount: 6, homeGoal: 0, awayGoal: 4, awayID: 0, time: 0 });
        this.hazfi.push({ id: 7, ballCount: 4, homeGoal: 0, awayGoal: 5, awayID: 11, time: 0 });
        this.hazfi.push({ id: 8, ballCount: 10, homeGoal: 0, awayGoal: 3, awayID: 6, time: 0 });
        this.hazfi.push({ id: 9, ballCount: 9, homeGoal: 0, awayGoal: 3, awayID: 7, time: 0 });
        this.hazfi.push({ id: 10, ballCount: 3, homeGoal: 0, awayGoal: 4, awayID: 15, time: 0 });
        this.hazfi.push({ id: 11, ballCount: 10, homeGoal: 0, awayGoal: 4, awayID: 5, time: 0 });
        this.hazfi.push({ id: 12, ballCount: 5, homeGoal: 0, awayGoal: 3, awayID: 9, time: 0 });
        this.hazfi.push({ id: 13, ballCount: 7, homeGoal: 0, awayGoal: 1, awayID: 1, time: 0 });
        this.hazfi.push({ id: 14, ballCount: 5, homeGoal: 0, awayGoal: 3, awayID: 12, time: 0 });
        this.hazfi.push({ id: 15, ballCount: 9, homeGoal: 0, awayGoal: 4, awayID: 10, time: 0 });


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
        this.DBStorage.setItem(this.cup + "_" + "week_" + 0 + "_score", 1);


        if (this.cup == 1)
            var matchList = this.rubicup;
        else if (this.cup == 2)
            var matchList = this.league;
        else if (this.cup == 3)
            var matchList = this.hazfi;


        for (var i = 0; i < matchList.length; i++) {
            if (matchList[i].awayID == this.DBStorage.getItem("team", 1))
                matchList[i].awayID = 14;

            weekCount++;
            matchList[i].week = weekCount;

            const match = cc.instantiate(this.matchPrefab);
            content.addChild(match);
            this.matchItems.push(match);

            match.getChildByName("WeekLbl").getComponent(cc.Label).string = this.replaceNum(" هفته " + weekCount);
            cc.loader.loadRes("logo/" + this.DBStorage.getItem("team"), cc.SpriteFrame, function (err, spriteFrame) {
                match.getChildByName("score_box").getChildByName("homeLogo").getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            cc.loader.loadRes("logo/" + matchList[i].awayID, cc.SpriteFrame, function (err, spriteFrame) {
                match.getChildByName("score_box").getChildByName("awayLogo").getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            if (matchList[i].time == 0)
                match.getChildByName("time").destroy();

            var player = match.getChildByName("Player")
            this.setPlayer(player);

            //cc.log("test: " + this.DBStorage.getItem(this.cup + "_" + "week_" + (weekCount - 1) + "_score", -5));

            if (this.DBStorage.getItem(this.cup + "_" + "week_" + (weekCount - 1) + "_score") >= 1) {
                if (this.lastPlayer != null)
                    this.activePlayer(this.lastPlayer, false);

                if (this.DBStorage.getItem(this.cup + "_detail_" + "week_" + weekCount) == null) {
                    match.getChildByName("score_box").getChildByName("ResultLbl").getComponent(cc.Label).string = "شروع";
                    match.getChildByName("score_box").color = cc.Color.YELLOW;
                } else
                    match.getChildByName("score_box").getChildByName("ResultLbl").getComponent(cc.Label).string = this.replaceNum(this.DBStorage.getItem(this.cup + "_detail_" + "week_" + weekCount));

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
            clickEventHandler.customEventData = matchList[i];//.id + "&" + matchList[i].awayID + "&" + matchList[i].awayGoal + "&" + matchList[i].homeGoal;

            button.clickEvents.push(clickEventHandler);

        }

        this.node.getComponent(cc.ScrollView).scrollToPercentVertical(1 / 16, 1);
        //this.node.getComponent(cc.ScrollView).scrollToBottom(1);
    },

    matchClick: function (event, customEventData) {
        //if (this.DBStorage.getItem(this.cup + "_" + "week_" + (customEventData.week - 1) + "_score", -1) >= 1)
        {

            this.activePlayer(this.lastPlayer, false);

            var player = this.matchItems[customEventData.id - 1].getChildByName("Player");
            this.lastPlayer = player;
            this.activePlayer(player, true);

            var canvas = cc.find("Canvas");
            const playMatch = cc.instantiate(this.playMatchPrefab);
            canvas.addChild(playMatch);

            var leagueName = "";
            if (this.cup == 1) leagueName = "روبیکاپ      ";
            else if (this.cup == 1) leagueName = "لیگ برتر";
            else if (this.cup == 1) leagueName = "جام حذفی";

            var pm = playMatch.getComponent("PlayMatch");
            pm.leagueName = leagueName;
            pm.cup = this.cup;
            pm.gameDetail = customEventData;
        }
    },

    setPlayer: function (player) {
        for (var j = 0; j < this.teamManager.players.length; j++) {
            if (this.teamManager.players[j].teamID == this.DBStorage.getItem("team")) {

                if (this.teamManager.teams[this.DBStorage.getItem("team")].numberColor == "black")
                    player.getChildByName("jersey").getChildByName("numberLbl").color = cc.Color.BLACK;

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
    replaceNum: function (input) {//۱۲۳۴۵۶۷۸۹۰
        return input.replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
    },

    close: function () {
        this.node.destroy();
    }
});
