cc.Class({
    extends: cc.Component,

    properties: {

    },


    start() {


        this.gameManager = cc.find("Canvas/GameManager").getComponent("GameManager");

        this.sprite = this.node.getComponent(cc.Sprite);
    },

    /*onCollisionEnter: function (other, self) {

        if (other.name.startsWith('Ball') && other.tag == 0) {

            this.unscheduleAllCallbacks();

            var self = this;
            cc.loader.loadRes("player/defence/hit/" + this.gameManager.gameDetail.awayID, cc.SpriteFrame, function (err, spriteFrame) {
                self.sprite.spriteFrame = spriteFrame;
            });
        }
    },*/

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.name.startsWith('Ball') && otherCollider.tag == 0) {

            this.unscheduleAllCallbacks();

            var self = this;
            cc.loader.loadRes("player/defence/hit/" + this.gameManager.gameDetail.awayID, cc.SpriteFrame, function (err, spriteFrame) {
                self.sprite.spriteFrame = spriteFrame;
            });
        }
    },

    /*onCollisionExit: function (other, self) {
        if (other.name.startsWith('Ball') && other.tag == 0) {
            this.schedule(function () { this.normal(); }, 0.3, 0);
        }
    },*/

    onEndContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.name.startsWith('Ball') && otherCollider.tag == 0) {
            this.schedule(function () { this.normal(); }, 0.3, 0);
        }
    },
    normal: function () {
        self = this;
        cc.loader.loadRes("player/defence/normal/" + this.gameManager.gameDetail.awayID, cc.SpriteFrame, function (err, spriteFrame) {
            self.sprite.spriteFrame = spriteFrame;
        });
    },
});
