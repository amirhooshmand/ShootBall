cc.Class({
    extends: cc.Component,

    properties: {
        canGetIt: true,
        fireBall: false,
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

    },

    onCollisionExit: function (other, self) {

        if (this.fireBall && other.tag == 5) {

            var circleCollider = other.getComponent(cc.CircleCollider);
            if (circleCollider) {
                var physicsCircleCollider = other.getComponent(cc.PhysicsCircleCollider);
                circleCollider.enabled = false;
                physicsCircleCollider.enabled = false;
            }

            var boxCollider = other.getComponent(cc.BoxCollider);
            if (boxCollider) {
                var physicsBoxCollider = other.getComponent(cc.PhysicsBoxCollider);
                boxCollider.enabled = false;
                physicsBoxCollider.enabled = false;
            }

            other.node.opacity = 70;
            other.node.color = new cc.Color(80 , 80, 80);
        }
    },

});
