cc.Class({
    extends: cc.Component,

    properties: {
        power:
        {
            default: 1.5,
            type: cc.Float
        },
    },

    start() {
        this.max = 1000;
        this.min = 400;
    },

    onCollisionEnter: function (other, self) {

        if (other.name.startsWith('Ball') && other.tag == 1) {
            var velocity = other.getComponent(cc.RigidBody).linearVelocity;

            var physicsCircleCollider = other.getComponent(cc.PhysicsCircleCollider);
            if (Math.abs(velocity.y) < this.min && this.power <= 1) {
                this.ballRestitution = physicsCircleCollider.restitution;
                physicsCircleCollider.restitution = 2;
                physicsCircleCollider.apply();
            }
            else if (Math.abs(velocity.x) < this.max || Math.abs(velocity.y) < this.max) {

                this.ballRestitution = physicsCircleCollider.restitution;
                physicsCircleCollider.restitution = this.power;
                physicsCircleCollider.apply();
            }
            else {
                cc.log("max");
            }
            /*var rigidbody = other.node.getComponent(cc.RigidBody);
            var velocity = rigidbody.linearVelocity;
            
            
            velocity.x = velocity.x * this.power;
            velocity.y = velocity.y * this.power;
            
            rigidbody.linearVelocity = velocity;*/
        }

    },

    onCollisionExit: function (other, self) {

        if (other.name.startsWith('Ball') && other.tag == 1) {
            var physicsCircleCollider = other.getComponent(cc.PhysicsCircleCollider);

            physicsCircleCollider.restitution = this.ballRestitution;
            physicsCircleCollider.apply();
            cc.log(this.node.name + ": " + other.name);
        }
    },
});