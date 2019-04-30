cc.Class({
    extends: cc.Component,

    properties: {
        speed:
        {
            default: 50,
            type: cc.Float
        },

        power:
        {
            default: 3000,
            type: cc.Float
        },

        startRotation:
        {
            default: 150,
            type: cc.Float
        },

        endRotation:
        {
            default: -150,
            type: cc.Float
        },
        starter: false,
    },
    start() {
        this.gameManager = cc.find("Canvas/GameManager").getComponent("GameManager");

        this.node.angle = (this.startRotation + this.endRotation) / 2;

        this.flag = false;
        this.ball = false;
        this.lock = this.starter;

        this.childNode = this.node.getChildByName("Arrow");
        this.aimNode = this.node.getChildByName("Aim");
        this.childNode.active = false;
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

        if (this.flag && !this.lock) {
            this.node.angle += dt * this.speed;
            if (this.node.angle >= this.startRotation)
                this.flag = false;
        }
        else if (!this.lock) {
            this.node.angle -= dt * this.speed;
            if (this.node.angle <= this.endRotation)
                this.flag = true;
        }
        this.ballNode.position = this.findPointOnCircle(this.node.x, this.node.y, 60, this.node.angle - 90);
        this.ballNode.angle = this.node.angle;
    },

    onCollisionEnter: function (other, self) {

        if (other.name.startsWith("Ball") && other.tag == 0 && !this.ball) {

            this.ballNode = other.node;
            this.ballNode.stopActionByTag(1);

            var ball = other.getComponent("Ball");
            if (!ball.canGetIt) return;

            var rigidbody = other.getComponent(cc.RigidBody);
            var physicsCircleCollider = other.getComponent(cc.PhysicsCircleCollider);
            var circleCollider = other.getComponent(cc.CircleCollider);
            var velocity = new cc.Vec2(0, 0);

            rigidbody.linearVelocity = velocity;
            rigidbody.type = cc.RigidBodyType.Static;


            if (this.starter) {
                var dest = new cc.Vec2(0, 500);
                var action = cc.moveTo(1, dest.x, dest.y);
                this.node.runAction(action);

                this.schedule(function () {
                    this.lock = false;
                    this.childNode.active = true;
                }, 1, 0);
            }
            else {
                this.childNode.active = true;
            }
            this.aimNode.active = false;
            this.ball = true;
        }
    },

    findNewPoint: function (x, y, angle, distance) {
        var result = new cc.Vec2(0, 0);

        result.x = Math.cos(angle * Math.PI / 180) * distance + x;
        result.y = Math.sin(angle * Math.PI / 180) * distance + y;

        this.ball.position = result;
    },

    onShoot: function () {

        var rigidbody = this.ballNode.getComponent(cc.RigidBody);
        rigidbody.type = cc.RigidBodyType.Dynamic;

        var temp = new cc.Vec2((this.node.position.x - this.ballNode.position.x) * -this.power,
            (this.node.position.y - this.ballNode.position.y) * -this.power);

        rigidbody.applyForceToCenter(temp);

        this.childNode.active = false;
        this.lock = this.starter;
        this.ball = false;

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