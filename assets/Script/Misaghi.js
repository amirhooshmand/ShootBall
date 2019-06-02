
cc.Class({
    extends: cc.Component,

    properties: {
        statusSprites: {
            default: [],
            type: cc.SpriteFrame
        },
    },

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
});
