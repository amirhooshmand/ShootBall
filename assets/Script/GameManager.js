cc.Class({
    extends: cc.Component,

    properties: {

        gameDetail: "",
        ballCount: 5,
        awayGoal: 0,
        homeGoal: 0,

        forwardNormal: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    start() {
        this.setFooter();

        this.newBall();
        this.setScoreboardGoal();
        this.setScoreboardLogo();
    },

    goal: function () {
        this.homeGoal++;
        this.newBall();
        this.setScoreboardGoal();
    },

    out: function () {
        this.newBall();
        //this.awayGoal++;
    },

    newBall: function () {
        if (this.ballCount > 0) {
            var addBallNode = cc.find("Canvas/Environment/AddBall");
            var addBall = addBallNode.getComponent("AddBall");
            addBall.initBall();
        }
        else
            this.endMatch();


    },

    shoot: function () {
        this.ballCount--;

        if (this.ballCount >= 0)
            this.setLableCount();
    },

    endMatch: function () {
        if (this.awayGoal < this.homeGoal)
            this.win();
        else if (this.awayGoal > this.homeGoal)
            this.lose();
        else this.draw();

        cc.director.loadScene("StartMenu");
    },

    win: function () {

    },
    lose: function () {

    },
    draw: function () {

    },

    setScoreboardGoal: function () {
        var lable = cc.find("Canvas/Scoreboard/GoalLable").getComponent(cc.Label);
        lable.string = this.homeGoal.toString() + " - " + this.awayGoal.toString();
    },

    setScoreboardLogo: function () {
        var self = this;

        var homeSprite = cc.find("Canvas/Scoreboard/HomeLogo/Mask/Logo").getComponent(cc.Sprite);
        cc.loader.loadRes("logo/" + self.gameDetail.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            homeSprite.spriteFrame = spriteFrame;
        });
        var awaySprite = cc.find("Canvas/Scoreboard/AwayLogo/Mask/Logo").getComponent(cc.Sprite);
        cc.loader.loadRes("logo/" + self.gameDetail.awayID, cc.SpriteFrame, function (err, spriteFrame) {
            awaySprite.spriteFrame = spriteFrame;
        });
    },

    setLableCount: function () {
        var lable = cc.find("Canvas/balls").getComponentInChildren(cc.Label);
        lable.string = this.ballCount.toString();
    },

    setFooter: function (defCount, fireCount, exteraBall, freezGoalKeeper) {
        var footer = cc.find("Canvas/footer");

        footer.getChildByName("ShopItem1").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(this.gameDetail.defCount.toString());
        footer.getChildByName("ShopItem2").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(this.gameDetail.fireCount.toString());
        footer.getChildByName("ShopItem3").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(this.gameDetail.exteraBall.toString());
        footer.getChildByName("ShopItem4").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(this.gameDetail.freezGoalKeeper.toString());
    },

    replaceNum: function (input) {//۱۲۳۴۵۶۷۸۹۰
        return input.replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
    },
});
