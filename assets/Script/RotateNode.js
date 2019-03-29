cc.Class({
    extends: cc.Component,

    properties: {
        duration:
        {
            default: 1.5,
            type: cc.Float
        },

        startRotation:
        {
            default: 0,
            type: cc.Float
        },

        endRotation:
        {
            default: 0,
            type: cc.Float
        },
    },

    start () {
        var seq = cc.repeatForever(
            cc.sequence(
                cc.rotateBy(this.duration, this.startRotation, this.startRotation),
                cc.rotateBy(this.duration, this.endRotation, this.endRotation)
            ));
        this.node.runAction(seq);
    },

});
