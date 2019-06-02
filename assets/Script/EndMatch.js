cc.Class({
    extends: cc.Component,

    properties: {
        detail: "",
        gameDetail: ""
    },

    start() {
        this.DBStorage = cc.find("DBStorage").getComponent("DBStorage");

        var teamManagerNode = cc.find("Canvas/TeamManager");
        this.teamManager = teamManagerNode.getComponent("TeamManager");
        this.canvas = cc.find("Canvas");

        var scoreBoard = this.node.getChildByName("stadium_scoreboard");

        cc.loader.loadRes("logo/" + this.detail.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            scoreBoard.getChildByName("HomeLogo").getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

        cc.loader.loadRes("logo/" + this.detail.awayID, cc.SpriteFrame, function (err, spriteFrame) {
            scoreBoard.getChildByName("AwayLogo").getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

        scoreBoard.getChildByName("HomeLable").getComponent(cc.Label).string = this.teamManager.teams[this.detail.homeID].name;
        scoreBoard.getChildByName("AwayLable").getComponent(cc.Label).string = this.teamManager.teams[this.detail.awayID].name;

        var leagueName = "";
        if (this.detail.cup == 1) leagueName = "شوتکاپ";
        else if (this.detail.cup == 1) leagueName = "لیگ برتر";
        else if (this.detail.cup == 1) leagueName = "جام حذفی";

        scoreBoard.getChildByName("leagueName").getComponent(cc.Label).string = leagueName;
        scoreBoard.getChildByName("weekLable").getComponent(cc.Label).string = "هفته " + this.replaceNum(this.detail.week.toString());

        var bubble = this.node.getChildByName("speech_bubble");
        bubble.getChildByName("dec").getComponent(cc.Label).string = this.replaceNum("امتیاز شما\nاینقدر است");

        if (this.detail.win)
            this.win();
        else this.lose();

        if (this.detail.cup == 3 && this.detail.week == 30)
            this.node.getChildByName("Next Button").destroy();

        this.DBStorage.load(this.DBStorage.data);
    },

    win() {
        //this.node.getChildByName("Next Button").getComponentInChilderen(cc.Label).string = "بازی\nبعد";

        var lastScore = this.DBStorage.getItem(this.detail.cup + "_week_" + this.detail.week + "_score", 0);
        var currentScore = 100;

        currentScore += (this.detail.homeGoal - (this.detail.homeGoal - this.detail.awayGoal)) * 25; // goal
        currentScore += (this.detail.homeGoal - this.detail.awayGoal) * 50; // extend goal

        var sprite = this.node.getChildByName("winPlayer").getComponent(cc.Sprite);
        cc.loader.loadRes("player/defence/normal/" + this.detail.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            sprite.spriteFrame = spriteFrame;
        });

        this.node.getChildByName("losePlayer").destroy();

        var bubble = this.node.getChildByName("speech_bubble");
        bubble.getChildByName("dec").getComponent(cc.Label).string = this.replaceNum("امتیاز شما\n" + currentScore);

        if (lastScore < currentScore) {

            if ((this.detail.cup == 1 && this.detail.week == 15) ||
                (this.detail.cup == 2 && this.detail.week == 30) ||
                (this.detail.cup == 3 && this.detail.week == 30)) {
                var f = this.DBStorage.getItem("scoreofEndCup" + this.detail.cup, 0);

                if (f == 0) {

                    currentScore += 1000;
                    this.DBStorage.setItem("scoreofEndCup" + this.detail.cup, 1);
                }
            }

            this.DBStorage.setItem(this.detail.cup + "_detail_" + "week_" + this.detail.week, this.detail.homeGoal + " - " + this.detail.awayGoal)
            this.DBStorage.setItem(this.detail.cup + "_week_" + this.detail.week + "_score", currentScore);
            this.DBStorage.save();

            this.sendScore(currentScore);

            // send score to server
        }
    },

    lose() {
        this.node.getChildByName("Next Button").getComponentInChildren(cc.Label).string = "بازی\n    دوباره";

        var sprite = this.node.getChildByName("losePlayer").getComponent(cc.Sprite);
        cc.loader.loadRes("player/goalkeeper/sad/" + this.detail.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            sprite.spriteFrame = spriteFrame;
        });

        this.node.getChildByName("winPlayer").destroy();

        var bubble = this.node.getChildByName("speech_bubble");
        bubble.getChildByName("dec").getComponent(cc.Label).string = this.replaceNum("): باختی\nدوباره تلاش کن");
    },

    next() {
        if (this.detail.win) {
            var mainMenu = cc.find("Canvas").getComponent("MainMenu");

            if (this.detail.cup == 1 && this.detail.week != 15) mainMenu.rubikupClick();
            else if (this.detail.cup == 1) mainMenu.premierLeague_1Click();

            if (this.detail.cup == 2 && this.detail.week != 30) mainMenu.premierLeague_1Click();
            else if (this.detail.cup == 2) mainMenu.cupClick();

            if (this.detail.cup == 3) mainMenu.cupClick();
        } else {
            var gdetail = this.gameDetail;
            var dbData = this.DBStorage.data;

            cc.director.loadScene("Level" + this.detail.cup + "-" + this.detail.week, function (err, data) {
                var sceneNode = cc.director.getScene();
                var gameManager = sceneNode.getChildByName('Canvas').getChildByName('GameManager');
                var db = sceneNode.getChildByName('DBStorage').getComponent("DBStorage");
                db.load(dbData);

                gameManager.getComponent("GameManager").gameDetail = gdetail;

            });
        }
    },

    back() {


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

        var url = window.location.href + "updateLeaderBoard.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var user = cc.sys.localStorage.getItem("userID");
        var name = cc.sys.localStorage.getItem("name");
        //if (this.DBStorage.getItem("name", "") != "")
        //name = this.DBStorage.getItem("name", "");
        //else name = this.DBStorage.getItem("userName");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var CryptoJS = require("crypto-js");
        var encrypted = cc.sys.localStorage.getItem("token");
        var bytes = CryptoJS.AES.decrypt(encrypted, 'sd1bfI8Puqj0&!jdvqL');
        var token = bytes.toString(CryptoJS.enc.Utf8);

        var arg = "user=" + user + "&name=" + name + "&point=" + score + "&token=" + token;
        console.log(arg);
        try { xhr.send(arg); }
        catch (error) { cc.log(error); }
    },

});
