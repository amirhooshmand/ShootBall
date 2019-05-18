cc.Class({
    extends: cc.Component,

    properties: {
    },

    start() {
        this.penalti = this.node.parent.getComponent("Penalti");
    },

    onCollisionEnter: function (other, self) {
        if (other.name.startsWith('Ball')) {
            var ball = other.getComponent("Ball");

            this.penalti.out();

            other.node.destroy();


        }

    },
});
