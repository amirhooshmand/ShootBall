
cc.Class({
    extends: cc.Component,

    properties: {
        homeID: 0,
        awayID: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var gameManagerNode = cc.find("Canvas/GameManager");
        this.gameManager = gameManagerNode.getComponent("GameManager");

        cc.director.getPhysicsManager().enabled = true;

        cc.find("Canvas/Environment").destroy();

        this.forwardPlayer = this.node.getChildByName("ForwardPlayer");
        var intro = this.node.getChildByName("Intro");
        var anim = intro.getComponent(cc.Animation);
        anim.on('finished', function (event) {
            intro.destroy();
        });

        // can not get again.
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            var circleCollider = this.forwardPlayer.getComponent(cc.CircleCollider);
            if (circleCollider) {
                circleCollider.enabled = false;
            }
        }, this);
    },

    start() {
        var self = this;
        cc.loader.loadRes("player/forward/normal/" + this.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            var sprite = self.forwardPlayer.getChildByName("player").getComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
        });
    },

    out() {
        this.gameManager.penaltiResualt(false);
    },

    goal() {
        this.gameManager.penaltiResualt(true);
    }
});
