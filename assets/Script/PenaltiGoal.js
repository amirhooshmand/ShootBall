cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.penalti = this.node.parent.getComponent("Penalti");

        this.goalKeeper = this.node.parent.getChildByName("GoalKeeper").getComponent("GoalKeeper");
    },

    onCollisionEnter: function (other, self) {
        if (other.name.startsWith('Ball') && other.tag == 1) {
            var ball = other.getComponent("Ball");

            var physicsCircleCollider = other.getComponent(cc.PhysicsCircleCollider);

            this.ballRestitution = physicsCircleCollider.restitution;
            physicsCircleCollider.restitution = 0;
            physicsCircleCollider.apply();

            this.penalti.goal();

            other.name = "Goal";

            this.schedule(function () {
                other.node.destroy();
            }, 1, 0);

            this.goalKeeper.sad();
        }
    },

    // update (dt) {},
});
