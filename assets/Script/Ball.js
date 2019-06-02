cc.Class({
    extends: cc.Component,

    properties: {
        fireBall: false,
        inHand: false,
    },

    setFire() {
        this.fireBall = true;
        this.node.color = new cc.Color(247, 156, 156);
    },

    start() {
        this.physicsCircleCollider = this.node.getComponent(cc.PhysicsCircleCollider);
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.max = 1000;
    },

    update(dt) {
        var velocity = this.rigidbody.linearVelocity;
        //cc.log(velocity);

        if (Math.abs(velocity.x) > this.max) {
            velocity.y = this.max / Math.abs(velocity.x) * velocity.y;
            this.rigidbody.linearVelocity = new cc.Vec2(((velocity.x < 0) ? -this.max : this.max), velocity.y);
        }

        if (Math.abs(velocity.y) > this.max) {
            velocity.x = this.max / Math.abs(velocity.y) * velocity.x;
            this.rigidbody.linearVelocity = new cc.Vec2(velocity.x, ((velocity.y < 0) ? -this.max : this.max));
        }

        if (Math.abs(velocity.y) < 1 && Math.abs(velocity.x) < 1) {
            velocity.y = 500;
            this.rigidbody.linearVelocity = velocity;
        }
    },

    onCollisionExit: function (other, self) {

        if (this.fireBall && other.tag == 5) {

            var circleCollider = other.getComponent(cc.CircleCollider);
            if (circleCollider) {
                var physicsCircleCollider = other.getComponent(cc.PhysicsCircleCollider);
                if (physicsCircleCollider)
                    other.node.removeComponent(cc.PhysicsCircleCollider);

                other.node.removeComponent(cc.CircleCollider);
            }

            var boxCollider = other.getComponent(cc.BoxCollider);
            if (boxCollider) {
                boxCollider.enabled = false;
                var physicsBoxCollider = other.getComponent(cc.PhysicsBoxCollider);
                if (physicsBoxCollider)
                    other.node.removeComponent(cc.PhysicsBoxCollider);

                other.node.removeComponent(cc.CircleCollider);
            }

            var moveNode = other.getComponent("MoveNode");
            if (moveNode) {
                other.node.stopActionByTag(1);
                moveNode.enabled = false;
            }

            var rotateNode = other.getComponent("RotateNode");
            if (rotateNode) {
                other.node.stopActionByTag(1);
                rotateNode.enabled = false;
            }

            var sparkAnim = other.getComponent("SparkAnimation");
            if (sparkAnim) {
                sparkAnim.enabled = false;
            }

            other.node.opacity = 70;
            other.node.color = new cc.Color(80, 80, 80);
        }
    },

    //onCollisionStay: function (other, self) {        
    //},

});
