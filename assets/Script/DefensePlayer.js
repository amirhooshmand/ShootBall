cc.Class({
    extends: cc.Component,

    properties: {

    },


    start() {
        var self = this;

        cc.loader.loadRes("defence/" + cc.sys.localStorage.getItem("team") + "_0", cc.SpriteFrame, function (err, spriteFrame) {
            self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },

    onCollisionEnter: function (other, self) {

        if (other.name.startsWith('Ball')) {

            var self = this;
            cc.loader.loadRes("defence/" + cc.sys.localStorage.getItem("team") + "_1", cc.SpriteFrame, function (err, spriteFrame) {
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            this.schedule(function () {

            }, 1, 0);

            //  var rigidbody = other.node.getComponent(cc.RigidBody);
            //  var velocity = rigidbody.linearVelocity;


            //  velocity.x = velocity.x * 2.7;
            //  velocity.y = velocity.y * 2.7;

            //  rigidbody.linearVelocity = velocity;
        }
    },

    onCollisionExit: function (other, self) {
        var self = this;

        if (other.name.startsWith('Ball')) {
            this.schedule(function () {
                cc.loader.loadRes("defence/" + cc.sys.localStorage.getItem("team") + "_0", cc.SpriteFrame, function (err, spriteFrame) {
                    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }, .1, 0);
        }


        //cc.log("DefensePlayer exit:" + other.name);

    },
});
