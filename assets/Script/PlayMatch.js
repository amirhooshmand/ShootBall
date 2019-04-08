cc.Class({
    extends: cc.Component,

    properties: {
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

        var scoreBoard = this.node.getChildByName("stadium_scoreboard");

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

    },

    replaceNum: function (input) {//۱۲۳۴۵۶۷۸۹۰
        return input.replace("1", "۱").replace("2", "۲").replace("3", "۳").replace("4", "۴").replace("5", "۵").replace("6", "۶").replace("7", "۷").replace("8", "۸").replace("9", "۹").replace("0", "۰");
    },

    closeClick: function () {
        this.node.destroy();
    },

    playClick: function () {
        cc.director.loadScene("Level1-2");
    },



});
