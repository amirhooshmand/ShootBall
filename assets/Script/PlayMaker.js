cc.Class({
    extends: cc.Component,

    properties: {
        forwardPlayers: {
            default: [],
            type: cc.Node
        },
        interval: .5,
        passDuration: .5,
        ballInHand: false,
    },

    start() {
        this.duration = 0.3;
        this.currentTime = 0;
        this.count = 0;
        this.elapsedTime = 0;

        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (this.ballInHand == true)
                this.onPass();
        }, this);

        
    },

    onPass: function () {
        this.ballInHand = false;

        var action1 = cc.sequence(cc.scaleTo(this.duration / 2 + 0.1, 1.7, 1.7), cc.scaleTo(this.duration / 2, 1, 1));
        this.ball.runAction(action1);

        var dest = this.findPointOnCircle(this.forwardPlayers[this.count].position.x,
            this.forwardPlayers[this.count].position.y, 65, this.forwardPlayers[this.count].angle - 90);

        // create a moving action
        var action = cc.moveTo(this.passDuration, dest.x, dest.y);
        action.setTag(1);
        // execute the action
        this.ball.runAction(action);

        //this.ball.position = dest;
    },

    onCollisionEnter: function (other, self) {
        if (other.name.startsWith("Ball")) {
            var ball = other.getComponent("Ball");
            if (!ball.canGetIt) return;

            var rigidbody = other.getComponent(cc.RigidBody);
            rigidbody.type = cc.RigidBodyType.Static;

            this.ball = other.node;

            other.node.position = this.findPointOnCircle(this.node.x, this.node.y, -50, this.node.angle - 90);
            this.ballInHand = true;
        }
    },

    findPointOnCircle: function (originX, originY, radius, angleRadians) {
        var newX = Math.cos(angleRadians * Math.PI / 180) * radius + originX;
        var newY = Math.sin(angleRadians * Math.PI / 180) * radius + originY;
        return new cc.Vec2(newX, newY);
    },

    update(dt) {
        this.elapsedTime += dt;

        if (this.ballInHand && (this.elapsedTime > this.currentTime + this.duration)) {
            this.currentTime = this.elapsedTime;

            this.forwardPlayers[this.count].getChildByName("Aim").active = false;
            if (this.count < this.forwardPlayers.length - 1)
                this.count++;
            else this.count = 0;
            this.forwardPlayers[this.count].getChildByName("Aim").active = true;

        }
    }
});
