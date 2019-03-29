cc.Class({
    extends: cc.Component,

    properties: {
        duration:
        {
            default: 1.5,
            type: cc.Float
        },

        startPos:
        {
            default: new cc.Vec2()
        },

        endPos:
        {
            default: new cc.Vec2()
        },
    },

    // onLoad () {},

    start () {
        var seq = cc.repeatForever(
            cc.sequence(
                cc.moveBy(this.duration, this.startPos.x, this.startPos.y),
                cc.moveBy(this.duration, this.endPos.x, this.endPos.y)
            ));
        this.node.runAction(seq);
    },
});
