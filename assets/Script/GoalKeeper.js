cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
        this.sprite.spriteFrame = this.images[0];
    },
    
    onCollisionEnter: function (other, self) {

        if(other.name.startsWith('Ball'))
        {
            var rigidbody = other.node.getComponent(cc.RigidBody);
            var velocity = rigidbody.linearVelocity;
         
 
             velocity.x = velocity.x * 3;
             velocity.y = velocity.y * 3;
 
             rigidbody.linearVelocity = velocity;
        }
         
 
         cc.log("GoalKeeper:" + other.name);
 
     },
});
