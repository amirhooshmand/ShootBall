
cc.Class({
    extends: cc.Component,

    properties: {
        LoadingPrefab: {
            default: null,
            type: cc.Prefab,
        },
    },


    start() {
        var canvas = cc.find("Canvas");
        this.loadingNode = cc.instantiate(this.LoadingPrefab);
        canvas.addChild(this.loadingNode);

        this.DBStorage = cc.find("DBStorage").getComponent("DBStorage");
        this.forwardPlayer = this.node.getChildByName("ForwardPlayer");

        var self = this;
        cc.loader.loadRes("player/forward/normal/" + this.DBStorage.getItem("team", 2), cc.SpriteFrame, function (err, spriteFrame) {
            var sprite = self.forwardPlayer.getChildByName("player").getComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
            self.loadingNode.destroy();
        });
        this.items = [1, 2, 3, 4, 5, 6, 0];

        this.boxItems = ["Box1", "Box2", "Box3", "Box4", "Box5", "Box6"];

        var chance = 100;
        for (let i = 0; i < 7; i++) {
            let c = Math.floor(Math.random() * chance);

            if (c >= 20) {
                chance -= 30;

                let t = Math.floor(Math.random() * this.items.length);
                let name = this.boxItems[Math.floor(Math.random() * this.boxItems.length)];
                this.node.getChildByName(name).getComponent("RewardBox").itemID = this.items[t];
                this.removeItem(this.items[t]);
                this.removeItemBox(name);
            }
            //else
            //this.node.getChildByName("Box" + (i + 1)).getComponent("RewardBox").itemID = -1;
        }
    },

    removeItem(t) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] === t) {
                this.items.splice(i, 1);
            }
        }
    },
    removeItemBox(name) {
        for (var i = 0; i < this.boxItems.length; i++) {
            if (this.boxItems[i] === name) {
                this.boxItems.splice(i, 1);
            }
        }
    },

    openAll(name) {
        for (let i = 1; i <= 6; i++) {
            if ("Box" + i != name)
                this.node.getChildByName("Box" + i).getComponent("RewardBox").open(false);
        }
    },

    close() {
        this.scheduleOnce(function () {
            this.node.destroy();
        }, 5);
    },


});
