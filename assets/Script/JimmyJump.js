// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.anim = this.node.getComponent(sp.Skeleton);
        this.anim.animation = "animation";

        this.scheduleOnce(function () {
            this.node.destroy();
        }, 100);

        this.gameManager = cc.find("Canvas/GameManager").getComponent("GameManager");

        this.dead = false;
    },

    onCollisionEnter: function (other, self) {
        if (other.name.startsWith('Ball') && other.tag == 0 && !this.dead) {
            this.anim.setAnimation(0, "fall", false);
            this.timeScale = 2;

            var move = this.node.getComponent("MoveNode");
            move.enabled = false;

            this.node.stopActionByTag(1);

            this.scheduleOnce(function () {
                this.node.destroy();
            }, 9);

            this.gameManager.ballCount += 3;
            this.gameManager.setLableCount();

            this.dead = true;
        }
    },

    // update (dt) {},
});
