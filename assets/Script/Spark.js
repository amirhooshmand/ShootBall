
cc.Class({
    extends: cc.Component,

    onCollisionEnter: function (other, self) {
        if (other.name.startsWith('Ball') && other.tag == 0) {

            var ball = other.getComponent("Ball");
            if (ball.inHand || ball.fireBall) return;

            var sparkAnim = other.getComponent("SparkAnimation");
            sparkAnim.enabled = true;

            var gameManagerNode = cc.find("Canvas/GameManager");
            this.gameManager = gameManagerNode.getComponent("GameManager");

            other.getComponent(cc.CircleCollider).enabled = false;


            var rigidbody = other.getComponent(cc.RigidBody);
            rigidbody.type = cc.RigidBodyType.Static;

            this.scheduleOnce(function () {
                other.node.destroy();
                this.gameManager.out();
            }, 1.5);
        }
    },
});
