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
        delay: false,
    },

    // onLoad () {},

    start() {

        if (this.node.width > 0) {
            this.startPos.x = this.startPos.x * -1;
            this.endPos.x = this.endPos.x * -1;
        }

        if (this.delay) {
            var seq = cc.repeatForever(
                cc.sequence(
                    cc.moveBy(this.duration, this.startPos.x, this.startPos.y),
                    cc.moveBy(1, 0, 0),
                    cc.moveBy(this.duration, this.endPos.x, this.endPos.y),
                    cc.moveBy(1, 0, 0)
                ));
            seq.tag = 1;
            this.node.runAction(seq);
        } else {
            var seq = cc.repeatForever(
                cc.sequence(
                    cc.moveBy(this.duration, this.startPos.x, this.startPos.y),
                    cc.moveBy(this.duration, this.endPos.x, this.endPos.y)
                ));
            seq.tag = 1;
            this.node.runAction(seq);
        }
    },
});
