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
            if (ball.inHand) return;

            var parent = cc.find("Canvas/Environment/BallParent");
            //parent.addChild(this.node);
            this.changeParent(this.node, parent);

            this.node.removeAllChildren();

            this.node.name = "Ball";
            var vel = other.getComponent(cc.RigidBody).linearVelocity;
            var newvel = new cc.Vec2(vel.x / 3, vel.y / 3);
            other.getComponent(cc.RigidBody).linearVelocity = newvel;

            var rigidbody = this.node.getComponent(cc.RigidBody);
            rigidbody.type = cc.RigidBodyType.Dynamic;

            this.node.removeComponent("FloatingBall");
        }
    },

    changeParent: function (node, newParent) {
        if (node.parent == newParent) return;
        var getWorldRotation = function (node) {
            var currNode = node;
            var resultRot = currNode.rotation;
            do {
                currNode = currNode.parent;
                resultRot += currNode.rotation;
            } while (currNode.parent != null);
            resultRot = resultRot % 360;
            return resultRot;
        };

        var oldWorRot = getWorldRotation(node);
        var newParentWorRot = getWorldRotation(newParent);
        var newLocRot = oldWorRot - newParentWorRot;

        var oldWorPos = node.convertToWorldSpaceAR(cc.p(0, 0));
        var newLocPos = newParent.convertToNodeSpaceAR(oldWorPos);

        node.parent = newParent;
        node.position = newLocPos;
        node.rotation = newLocRot;
    }
});
