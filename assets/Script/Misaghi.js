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
        statusSprites: {
            default: [],
            type: cc.SpriteFrame
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

        var misaghi = this.node.getComponent(cc.Sprite);

        var playMatch = this.node.parent.getComponent("PlayMatch");
        //cc.log(playMatch.gameDetail.time);

        if (playMatch.gameDetail.time == 0) {
            misaghi.spriteFrame = this.statusSprites[0];
        } else {
            misaghi.spriteFrame = this.statusSprites[1];
        }
    },

    // update (dt) {},
});
