cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: [],
            type: cc.Node
        },
        interval: .5,
        passDuration: .5,
        ballInHand: false,
        forceShoot: false,
        power: 1500.0,
    },

    start() {
        this.gameManager = cc.find("Canvas/GameManager").getComponent("GameManager");

        this.currentTime = 0;
        this.count = 0;
        this.elapsedTime = 0;

        this.arrowNode = this.node.getChildByName("Arrow");
        this.aimNode = this.node.getChildByName("Aim");
        this.arrowNode.active = false;
        this.aimNode.active = false;

        this.sprite = this.node.getChildByName("player").getComponent(cc.Sprite);

        var environment = cc.find("Canvas/Environment");
        for (var i = 0; i < environment.children.length; i++) {
            var childById = environment.children[i];
            var name = childById.name;

            if (childById == this.node) { }
            else if (name == "ForwardPlayer" || name == "PlayMaker") {
                this.player.push(childById);
            }
        }

        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (this.ballInHand == true) {
                if (this.forceShoot)
                    this.onShoot();
                else this.onPass();
            }
        }, this);
    },
    findPointOnCircle: function (originX, originY, radius, angleRadians) {
        var newX = Math.cos(angleRadians * Math.PI / 180) * radius + originX;
        var newY = Math.sin(angleRadians * Math.PI / 180) * radius + originY;
        return new cc.Vec2(newX, newY);
    },

    onPass: function () {
        if (this.player[this.count].name == "PlayMaker") {
            var playMaker = this.player[this.count].getComponent("PlayMaker");
            playMaker.forceShoot = true;
        }

        this.ballInHand = false;

        var action1 = cc.sequence(cc.scaleTo(this.passDuration / 2, 1.7, 1.7), cc.scaleTo(this.passDuration / 2, 0.85, 0.85));
        this.ball.runAction(action1);

        var dest = this.findPointOnCircle(this.player[this.count].position.x,
            this.player[this.count].position.y, 65, this.player[this.count].angle - 90);

        // create a moving action
        var action = cc.moveTo(this.passDuration, dest.x, dest.y);
        action.setTag(1);
        // execute the action
        this.ball.runAction(action);

        this.shoot();

        var ballComponent = this.ball.getComponent("Ball");

        var colider = this.ball.getComponent(cc.CircleCollider);
        colider.enabled = false;

        this.scheduleOnce(function () {
            colider.enabled = true;
            ballComponent.inHand = false;
        }, this.passDuration)

    },

    onShoot: function () {

        var rigidbody = this.ballNode.getComponent(cc.RigidBody);
        rigidbody.type = cc.RigidBodyType.Dynamic;

        var temp = new cc.Vec2((this.node.position.x - this.ballNode.position.x) * -this.power,
            (this.node.position.y - this.ballNode.position.y) * -this.power);

        rigidbody.applyForceToCenter(temp);

        this.arrowNode.active = false;

        this.forceShoot = this.ballInHand = false;

        var ball = this.ballNode.getComponent("Ball");
        ball.inHand = false;

        this.shoot();
    },

    normal: function () {
        self = this;
        cc.loader.loadRes("player/playMaker/normal/" + this.gameManager.gameDetail.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            self.sprite.spriteFrame = spriteFrame;
        });
    },

    shoot: function () {
        self = this;

        cc.loader.loadRes("player/playMaker/shoot/" + this.gameManager.gameDetail.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            self.sprite.spriteFrame = spriteFrame;
        });

        this.schedule(function () { this.normal(); }, 0.1, 0);
    },

    onCollisionEnter: function (other, self) {
        if (other.name.startsWith("Ball") && other.tag == 0 && !this.ballInHand) {
            this.aimNode.active = false;

            var ball = other.getComponent("Ball");
            ball.inHand = true;

            this.ballNode = other.node;
            this.ballNode.stopActionByTag(1);

            var rigidbody = other.getComponent(cc.RigidBody);
            rigidbody.type = cc.RigidBodyType.Static;

            this.ball = other.node;

            if (this.forceShoot) {
                this.arrowNode.active = true;

                other.node.position = this.findPointOnCircle(this.node.x, this.node.y, 65, this.node.angle - 90);
            } else
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

        if (this.ballInHand && !this.forceShoot && (this.elapsedTime > this.currentTime + 0.3)) {
            this.currentTime = this.elapsedTime;

            this.player[this.count].getChildByName("Aim").active = false;
            if (this.count < this.player.length - 1)
                this.count++;
            else this.count = 0;
            this.player[this.count].getChildByName("Aim").active = true;
        }

        if (this.ballInHand) {
            if (this.forceShoot)
                this.ballNode.position = this.findPointOnCircle(this.node.x, this.node.y, 65, this.node.angle - 90);
            else
                this.ballNode.position = this.findPointOnCircle(this.node.x, this.node.y, -50, this.node.angle - 90);
        }
    }
});
