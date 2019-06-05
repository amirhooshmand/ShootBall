cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        var gameManagerNode = cc.find("Canvas/GameManager");
        this.gameManager = gameManagerNode.getComponent("GameManager");
        this.goalKeeper = cc.find("Canvas/Environment/GoalKeeper").getComponent("GoalKeeper");
    },

    onCollisionEnter: function (other, self) {
        if (other.name.startsWith('Ball') && other.tag == 1) {
            var ball = other.getComponent("Ball");

            var physicsCircleCollider = other.getComponent(cc.PhysicsCircleCollider);

            this.ballRestitution = physicsCircleCollider.restitution;
            physicsCircleCollider.restitution = 0;
            physicsCircleCollider.apply();

            this.gameManager.goal();

            other.name = "Goal";

            this.schedule(function () {
                other.node.destroy();
            }, 1, 0);

            try {
                this.goalKeeper.sad();
            } catch (err) { }
        }
    },

    // update (dt) {},
});
