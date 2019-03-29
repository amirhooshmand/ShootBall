cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    start () {

    },
    onCollisionEnter: function (other, self) {

        if(other.name.startsWith('Ball'))
        {
            var rigidbody = other.node.getComponent(cc.RigidBody);
            var velocity = rigidbody.linearVelocity;
         
 
            velocity.x = velocity.x * 2;
            velocity.y = velocity.y * 2;
 
            rigidbody.linearVelocity = velocity;
        } 
     },
});
