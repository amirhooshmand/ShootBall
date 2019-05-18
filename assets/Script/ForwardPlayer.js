cc.Class({
    extends: cc.Component,

    properties: {
        duration:
        {
            default: .8,
            type: cc.Float
        },

        power:
        {
            default: 3000,
            type: cc.Float
        },

        startRotation:
        {
            default: 75,
            type: cc.Float
        },

        endRotation:
        {
            default: -75,
            type: cc.Float
        },
        starter: false,
    },
    onLoad() {
        if (this.starter) this.node.name = "ForwardPlayer-Starter";
    },
    start() {
        this.gameManager = cc.find("Canvas/GameManager").getComponent("GameManager");

        this.node.angle = (this.startRotation + this.endRotation) / 2;

        this.flag = false;
        this.ball = false;
        this.lock = this.starter;

        this.arrowNode = this.node.getChildByName("Arrow");
        this.aimNode = this.node.getChildByName("Aim");
        this.arrowNode.active = false;
        this.aimNode.active = false;

        this.sprite = this.node.getChildByName("player").getComponent(cc.Sprite);

        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (this.ball && !this.lock) {
                this.onShoot();
                if (this.starter) {
                    this.gameManager.shoot();
                }
            }
        }, this);

        if (this.starter) this.gameManager = cc.find("Canvas/GameManager").getComponent("GameManager");
    },

    findPointOnCircle: function (originX, originY, radius, angleRadians) {
        var newX = Math.cos(angleRadians * Math.PI / 180) * radius + originX;
        var newY = Math.sin(angleRadians * Math.PI / 180) * radius + originY;
        return new cc.Vec2(newX, newY);
    },

    update(dt) {
        if (!this.ball) return;


        this.ballNode.position = this.findPointOnCircle(this.node.x, this.node.y, 60, this.node.angle - 90);
        this.ballNode.angle = this.node.angle;
    },

    onCollisionEnter: function (other, self) {

        if (other.name.startsWith("Ball") && other.tag == 0 && !this.ball) {

            this.ballNode = other.node;
            this.ballNode.stopActionByTag(2);

            var ball = other.getComponent("Ball");
            ball.ballInHand = true;

            var rigidbody = other.getComponent(cc.RigidBody);
            var velocity = new cc.Vec2(0, 0);

            rigidbody.linearVelocity = velocity;
            rigidbody.type = cc.RigidBodyType.Static;

            var a1 = cc.rotateTo(this.duration, this.startRotation, 0);
            var a2 = cc.rotateTo(this.duration, this.endRotation, 0);
            a1.easing(cc.easeQuadraticActionInOut());
            a2.easing(cc.easeQuadraticActionInOut());


            //this.ballColider = this.ballNode.getComponent(cc.CircleCollider);
            //this.ballColider.enabled = false;

            if (this.starter) {
                var dest = new cc.Vec2(0, 500);
                var action = cc.moveTo(1, dest.x, dest.y);
                this.node.runAction(action);

                this.scheduleOnce(function () {
                    this.lock = false;
                    this.arrowNode.active = true;

                    var startAction = cc.rotateTo(this.duration / 2, this.startRotation, 0);
                    startAction.easing(cc.easeQuadraticActionInOut());
                    this.node.runAction(startAction);

                    this.scheduleOnce(function () {
                        var seq = cc.repeatForever(cc.sequence(a2, a1));
                        seq.setTag(2);
                        this.node.runAction(seq);
                    }, this.duration / 2);
                }, 1);
            }
            else {
                var circleCollider = other.getComponent(cc.CircleCollider);
                //circleCollider.enabled = false;

                var startAction = cc.rotateTo(this.duration / 2, this.startRotation, 0);
                startAction.easing(cc.easeQuadraticActionInOut());
                this.node.runAction(startAction);

                this.scheduleOnce(function () {
                    var seq = cc.repeatForever(cc.sequence(a2, a1));
                    seq.setTag(2);
                    this.node.runAction(seq);
                }, this.duration / 2);

                this.arrowNode.active = true;
            }
            this.aimNode.active = false;
            this.ball = true;
        }
    },
    onCollisionExit: function (other, self) {
        if (other.name.startsWith("Ball") && other.tag == 0) {
            var ball = other.getComponent("Ball");
            ball.ballInHand = false;
        }
    },

    findNewPoint: function (x, y, angle, distance) {
        var result = new cc.Vec2(0, 0);

        result.x = Math.cos(angle * Math.PI / 180) * distance + x;
        result.y = Math.sin(angle * Math.PI / 180) * distance + y;

        this.ball.position = result;
    },

    onShoot: function () {

        this.unscheduleAllCallbacks();

        this.node.stopActionByTag(2);

        var a1 = cc.rotateTo(0.3, 0, 0);
        this.node.runAction(a1);

        var rigidbody = this.ballNode.getComponent(cc.RigidBody);
        rigidbody.type = cc.RigidBodyType.Dynamic;

        var temp = new cc.Vec2((this.node.position.x - this.ballNode.position.x) * -this.power,
            (this.node.position.y - this.ballNode.position.y) * -this.power);

        rigidbody.applyForceToCenter(temp);

        this.arrowNode.active = false;
        this.lock = this.starter;
        this.ball = false;

        var circleCollider = this.ballNode.getComponent(cc.CircleCollider);
        //circleCollider.enabled = true;

        this.shoot();

        if (this.starter) {

            this.node.removeComponent(cc.CircleCollider);
            //circleCollider.enable = false;

            var dest = new cc.Vec2(0, 650);
            var action = cc.moveTo(1, dest.x, dest.y);
            this.node.runAction(action);
            this.schedule(function () {
                this.node.angle = 0;
                this.node.addComponent(cc.CircleCollider);
                var circleCollider = this.node.getComponent(cc.CircleCollider);
                circleCollider.radius = 48;
                //circleCollider.enabled  = true; 
            }, 1, 0);
        }
    },

    normal: function () {
        self = this;
        cc.loader.loadRes("player/forward/normal/" + this.gameManager.gameDetail.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            self.sprite.spriteFrame = spriteFrame;
        });
    },

    shoot: function () {
        self = this;

        cc.loader.loadRes("player/forward/shoot/" + this.gameManager.gameDetail.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            self.sprite.spriteFrame = spriteFrame;
        });

        this.schedule(function () { this.normal(); }, 0.1, 0);
    },

});