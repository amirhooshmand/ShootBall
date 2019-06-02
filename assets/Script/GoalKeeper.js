cc.Class({
    extends: cc.Component,

    properties: {
        isFreeze: false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.gameManager = cc.find("Canvas/GameManager").getComponent("GameManager");

        this.sprite = this.node.getComponent(cc.Sprite);
        this.move = this.node.getComponent("MoveNodeWithRandomSpeed");
        this.save();

    },

    normal: function () {
        this.unscheduleAllCallbacks();
        
        self = this;

        cc.loader.loadRes("player/goalkeeper/normal/" + this.gameManager.gameDetail.awayID, cc.SpriteFrame, function (err, spriteFrame) {
            try { self.sprite.spriteFrame = spriteFrame; } catch (err) { }
        });

        this.isFreeze = false;
        this.move.enabled = true;
    },

    freeze: function () {
        this.unscheduleAllCallbacks();
        
        self = this;

        cc.loader.loadRes("player/goalkeeper/freeze/" + this.gameManager.gameDetail.awayID, cc.SpriteFrame, function (err, spriteFrame) {
            try { self.sprite.spriteFrame = spriteFrame; } catch (err) { }
        });
        this.isFreeze = true;

        this.stop();

        //this.schedule(function () { this.normal(); }, 0.2, 0);
    },

    save: function () {

        if (this.isFreeze) return;

        this.unscheduleAllCallbacks();

        self = this;
        cc.log(this.gameManager.gameDetail.awayID);

        cc.loader.loadRes("player/goalkeeper/save/" + this.gameManager.gameDetail.awayID, cc.SpriteFrame, function (err, spriteFrame) {
            try { self.sprite.spriteFrame = spriteFrame; } catch (err) { }
        });

        this.schedule(function () { this.normal(); }, 0.2, 0);
    },

    sad: function () {

        this.unscheduleAllCallbacks();

        self = this;
        cc.loader.loadRes("player/goalkeeper/sad/" + this.gameManager.gameDetail.awayID, cc.SpriteFrame, function (err, spriteFrame) {
            try { self.sprite.spriteFrame = spriteFrame; } catch (err) { }
        });

        this.stop();

        this.schedule(function () { this.normal(); }, 2.7, 0);
    },

    onCollisionEnter: function (other, self) {
        if (other.name.startsWith('Ball') && other.tag == 1) {
            if (this.isFreeze) return;
            this.save();
        }
    },

    stop: function () {
        this.node.stopActionByTag(1);
        this.move.elapsedTime += 10;
        this.move.right = !this.move.right;
        this.move.enabled = false;
    }
});
