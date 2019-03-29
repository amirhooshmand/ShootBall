cc.Class({
    extends: cc.Component,
    
    properties: {
        power:
        {
            default: 1.5,
            type: cc.Float
        },
    },
    
    start()
    {
        this.max = 800;
    },

    onCollisionEnter: function (other, self) {
        
        if(other.name.startsWith('Ball'))
        {
            var velocity = other.getComponent(cc.RigidBody).linearVelocity;
            if(Math.abs(velocity.x) < this.max || Math.abs(velocity.y) < this.max)
            {
                var physicsCircleCollider = other.getComponent(cc.PhysicsCircleCollider);
                
                this.ballRestitution = physicsCircleCollider.restitution;
                physicsCircleCollider.restitution = this.power;
                physicsCircleCollider.apply();
            }
            else{
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
        
        if(other.name.startsWith('Ball'))
        {
            var physicsCircleCollider = other.getComponent(cc.PhysicsCircleCollider);
            
            physicsCircleCollider.restitution = 1;
            physicsCircleCollider.apply();
            cc.log("DefensePlayer: " + other.name);
        } 
    },
});