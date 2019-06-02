cc.Class({
    extends: cc.Component,

    properties: {
        

        rigidbody: {
            default: null,
            type: cc.RigidBody
        },
    },
    
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = false;
        //this.changeY();
        this.rigidbody = this.node.getComponent(cc.RigidBody);

        
    },
});
