cc.Class({
    extends: cc.Component,

    start() {
        this.startScale = this.node.scale;
    },

    onCollisionEnter: function (other, self) {
        if (!other.name.startsWith("Ball") && other.tag != 0) return;

        var action = cc.sequence(
            cc.scaleTo(0.07, this.startScale + 0.1, this.startScale + 0.1),
            cc.scaleTo(0.07, this.startScale, this.startScale)
        );


        this.node.runAction(action);
    }
});
