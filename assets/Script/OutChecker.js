cc.Class({
    extends: cc.Component,

    properties: {
    },

    start() {
        var gameManagerNode = cc.find("Canvas/GameManager");
        this.gameManager = gameManagerNode.getComponent("GameManager");

    },

    onCollisionEnter: function (other, self) {
        if (other.name.startsWith('Ball')) {
            var ball = other.getComponent("Ball");

            this.gameManager.out();

            other.node.destroy();


        }

    },
});
