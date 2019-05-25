cc.Class({
    extends: cc.Component,

    properties: {
        duration:
        {
            default: 1.5,
            type: cc.Float
        },
    },

    start() {
        var seq = cc.repeatForever(
            cc.sequence(
                cc.rotateTo(this.duration, 180, 180),
                cc.rotateTo(this.duration, 360, 360)
            ));

        this.node.getChildByName("Star").runAction(seq);
        this.node.name = "FloatBall";
    },

    onCollisionExit: function (other, self) {

        if (other.name.startsWith('Ball') && other.tag == 0) {

            var ball = other.getComponent("Ball");
            if (ball.ballInHand) return;

            this.node.removeAllChildren();

            this.node.name = "Ball";

            var rigidbody = this.node.getComponent(cc.RigidBody);
            rigidbody.type = cc.RigidBodyType.Dynamic;
        }
    },
});
