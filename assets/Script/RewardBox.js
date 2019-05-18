cc.Class({
    extends: cc.Component,

    properties: {
        items: {
            default: [],
            type: cc.SpriteFrame
        },
        itemID: 0,
    },

    start() {
        this.childItem = this.node.getChildByName("ItemBox");
        this.sprite = this.childItem.getChildByName("image").getComponent(cc.Sprite);

        if (this.itemID != -1)
            this.sprite.spriteFrame = this.items[this.itemID];

        cc.log(this.itemID);

        this.childItem.active = false;

    },

    open(flag) {
        let spine = this.node.getComponent(sp.Skeleton);
        spine.animation = "animation";

        if (this.itemID != -1) {
            this.childItem.active = true;

            var action = cc.scaleTo(0.3, 1.5, 1.5);
            this.childItem.runAction(action);

            if (flag) {
                //save

                let DBStorage = cc.find("DBStorage").getComponent("DBStorage");
                switch (this.itemID) {
                    case 0:
                        var coin = DBStorage.getItem("coin", 0);
                        coin += 100;
                        DBStorage.setItem("coin", coin);
                        DBStorage.save();
                        break;
                    case 1:
                        var coin = DBStorage.getItem("coin", 0);
                        coin += 200;
                        DBStorage.setItem("coin", coin);
                        DBStorage.save();
                        break;
                    case 2:
                        var coin = DBStorage.getItem("coin", 0);
                        coin += 300;
                        DBStorage.setItem("coin", coin);
                        DBStorage.save();
                        break;

                    case 3:
                        var ball = DBStorage.getItem("exteraBall", 1);
                        ball++;
                        DBStorage.setItem("exteraBall", ball);
                        DBStorage.save();
                        break;
                    case 4:
                        var fire = DBStorage.getItem("fireBall", 1);
                        fire++;
                        DBStorage.setItem("fireBall", fire);
                        DBStorage.save();
                        break;
                    case 5:
                        var freeze = DBStorage.getItem("freezGoalKeeper", 1);
                        freeze++;
                        DBStorage.setItem("freezGoalKeeper", freeze);
                        DBStorage.save();
                        break;
                    case 6:
                        var vodo = DBStorage.getItem("removeDefender", 1);
                        vodo++;
                        DBStorage.setItem("removeDefender", vodo);
                        DBStorage.save();
                        break;
                }

            }
        }

        if (flag)
            this.scheduleOnce(function () {
                this.node.parent.getComponent("DailyReward").openAll(this.node.name);
            }, 1);
    },

});
