cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        var gameManagerNode = cc.find("Canvas/GameManager");
        this.gameManager = gameManagerNode.getComponent("GameManager");
    },

    onCollisionEnter: function (other, self) {

        if (other.name.startsWith('Ball')) {
            var ball = other.getComponent("Ball");
            if (!ball.canGetIt) return;

            var physicsCircleCollider = other.getComponent(cc.PhysicsPolygonCollider);

            this.ballRestitution = physicsCircleCollider.restitution;
            physicsCircleCollider.restitution = 0;
            physicsCircleCollider.apply();

            this.gameManager.goal();

            other.name = "Goal";

            this.schedule(function () {
                other.node.destroy();
            }, 1, 0);
        }
    },

    // update (dt) {},
});
