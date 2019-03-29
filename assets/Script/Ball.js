cc.Class({
    extends: cc.Component,

    properties: {
        canGetIt: true,
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

    }

});
