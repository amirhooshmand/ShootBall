cc.Class({
    extends: cc.Component,

    properties: {
        duration:
        {
            default: 1.5,
            type: cc.Float
        },
    },

    start () {
        var seq = cc.repeatForever(
            cc.sequence(
                cc.rotateTo(this.duration, 180, 180),
                cc.rotateTo(this.duration, 360, 360)
            ));
        this.node.getChildByName("Star").runAction(seq);
    },

    onCollisionEnter: function (other, self) {

        if(!this.canGetIt && other.name.startsWith('Ball'))
        {
            this.node.removeAllChildren();

             var rigidbody = this.node.getComponent(cc.RigidBody);
             rigidbody.type = cc.RigidBodyType.Dynamic;
        }
     },
});
