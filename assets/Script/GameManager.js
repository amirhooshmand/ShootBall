cc.Class({
    extends: cc.Component,

    properties: {
        ballCount: 5,
        awayGoal: 0,
        homeGoal: 0,
    },

    start() {
        this.newBall();
    },

    goal: function () {
        this.homeGoal++;
        this.newBall();
    },

    out: function () {
        this.newBall();
        this.awayGoal++;
    },

    newBall: function () {
        if (this.ballCount > 0) {
            var addBallNode = cc.find("Canvas/AddBall");
            var addBall = addBallNode.getComponent("AddBall");
            addBall.initBall();
        }
        else
            this.endMatch();

        this.ballCount--;
    },

    endMatch: function () {
        if (this.awayGoal < this.homeGoal)
            this.win();
        else if (this.awayGoal > this.homeGoal)
            this.lose();
        else this.draw();
    },

    win: function () {

    },
    lose: function () {

    },
    draw: function () {

    }
});
