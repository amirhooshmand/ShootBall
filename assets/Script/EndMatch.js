cc.Class({
    extends: cc.Component,

    properties: {
        gameDetail: ""
    },

    start() {
        this.DBStorage = cc.find("DBStorage").getComponent("DBStorage");

        var teamManagerNode = cc.find("Canvas/TeamManager");
        this.teamManager = teamManagerNode.getComponent("TeamManager");
        this.canvas = cc.find("Canvas");

        var scoreBoard = this.node.getChildByName("stadium_scoreboard");

        cc.loader.loadRes("logo/" + this.gameDetail.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            scoreBoard.getChildByName("HomeLogo").getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

        cc.loader.loadRes("logo/" + this.gameDetail.awayID, cc.SpriteFrame, function (err, spriteFrame) {
            scoreBoard.getChildByName("AwayLogo").getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

        scoreBoard.getChildByName("HomeLable").getComponent(cc.Label).string = this.teamManager.teams[this.gameDetail.homeID].name;
        scoreBoard.getChildByName("AwayLable").getComponent(cc.Label).string = this.teamManager.teams[this.gameDetail.awayID].name;

        var leagueName = "";
        if (this.gameDetail.cup == 1) leagueName = "روبیکاپ      ";
        else if (this.gameDetail.cup == 1) leagueName = "لیگ برتر";
        else if (this.gameDetail.cup == 1) leagueName = "جام حذفی";

        scoreBoard.getChildByName("leagueName").getComponent(cc.Label).string = leagueName;
        scoreBoard.getChildByName("weekLable").getComponent(cc.Label).string = "هفته " + this.replaceNum(this.gameDetail.week.toString());

        var bubble = this.node.getChildByName("speech_bubble");
        bubble.getChildByName("dec").getComponent(cc.Label).string = this.replaceNum("امتیاز شما\nاینقدر است");

        if (this.gameDetail.win)
            this.win();
        else this.lose();
    },

    win() {

        var lastScore = this.DBStorage.getItem(this.gameDetail.cup + "_week_" + this.gameDetail.week + "_score", 0);
        var currentScore = 100;

        //if (lastScore <= 0) currentScore += 100; // for win

        currentScore += (this.gameDetail.homeGoal - (this.gameDetail.homeGoal - this.gameDetail.awayGoal)) * 25; // goal
        currentScore += (this.gameDetail.homeGoal - this.gameDetail.awayGoal) * 50; // extend goal

        this.node.getChildByName("losePlayer").destroy();

        var bubble = this.node.getChildByName("speech_bubble");
        bubble.getChildByName("dec").getComponent(cc.Label).string = this.replaceNum("امتیاز شما " + currentScore + " است");

        if (lastScore < currentScore) {

            if (this.gameDetail.cup == 1) {
                if (this.gameDetail.week == 16) {
                    var f = this.DBStorage.getItem("scoreofEndCup" + this.gameDetail.cup, 0);
                    if (f == 0) {
                        currentScore += 1000;
                        this.DBStorage.setItem("scoreofEndCup" + this.gameDetail.cup, 1);
                    }
                }
            }
            this.DBStorage.setItem(this.gameDetail.cup + "_detail_" + "week_" + this.gameDetail.week, this.gameDetail.homeGoal + " - " + this.gameDetail.awayGoal)
            this.DBStorage.setItem(this.gameDetail.cup + "_week_" + this.gameDetail.week + "_score", currentScore);
            this.DBStorage.save();

            this.sendScore(currentScore);

            // send score to server
        }
    },

    lose() {
        this.node.getChildByName("winPlayer").destroy();

        var bubble = this.node.getChildByName("speech_bubble");
        bubble.getChildByName("dec").getComponent(cc.Label).string = this.replaceNum("): باختی\nدوباره تلاش کن");
    },

    back() {
        var mainMenu = cc.find("Canvas").getComponent("MainMenu");
        if (this.gameDetail.cup == 1) mainMenu.rubikupClick();
        else if (this.gameDetail.cup == 2) mainMenu.premierLeague_1Click();
        else if (this.gameDetail.cup == 3) mainMenu.cupClick();

        this.node.destroy();
    },

    replaceNum: function (input) {//۱۲۳۴۵۶۷۸۹۰
        return input.replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
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
    sendScore: function (score) {

        var url = "http://rubika3.rakhtkan.net/updateLeaderBoard.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var arg = "user=" + this.DBStorage.getItem("userID") + "&name=" + this.DBStorage.getItem("userName") + "&point=" + score;

        try { xhr.send(arg); }
        catch (error) { cc.log(error); }
    },

});
