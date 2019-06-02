cc.Class({
    extends: cc.Component,

    properties: {

    },

    start() {
        this.anim = this.node.getComponent(sp.Skeleton);
        this.anim.animation = "animation";

        this.scheduleOnce(function () {
            this.node.destroy();
        }, 11);

        this.gameManager = cc.find("Canvas/GameManager").getComponent("GameManager");

        this.dead = false;
    },

    onCollisionEnter: function (other, self) {
        if (other.name.startsWith('Ball') && other.tag == 0 && !this.dead) {

            var ball = other.getComponent("Ball");
            if (ball.inHand) return;


            this.anim.setAnimation(0, "fall", false);
            this.timeScale = 2;

            var move = this.node.getComponent("MoveNode");
            move.enabled = false;

            this.node.stopActionByTag(1);

            this.scheduleOnce(function () {
                this.node.destroy();
            }, 1.2);

            this.gameManager.ballCount += 3;
            this.gameManager.setLableCount();

            this.dead = true;
        }
    },
});
