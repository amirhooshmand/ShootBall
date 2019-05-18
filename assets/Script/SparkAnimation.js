cc.Class({
    extends: cc.Component,

    properties: {
        sheets: {
            default: [],
            type: cc.SpriteFrame,
        },
    },

    start() {

        var sprite = this.node.getComponent(cc.Sprite);
        var count = 0;

        this.schedule(function () {
            sprite.spriteFrame = this.sheets[count];
            count++;
            if (count >= this.sheets.length)
                count = 0;
        }, 0.1);
    },

});
