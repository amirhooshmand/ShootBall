var Item = cc.Class({
    name: 'Item',
    properties: {
        iconSF: cc.SpriteFrame
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        maxCount:
        {
            default: 3,
            type: cc.Integer
        },

        useImage: true,
        //sprite:{type:cc.Sprite,default :null},
        items: {
            default: [],
            type: Item
        },
    },

    start() {
        this.count = this.maxCount;
        //cc.log(data.iconSF.name);

        this.sprite = this.node.getComponent(cc.Sprite);
        if (this.useImage) {
            var data = this.items[this.count - 1];
            this.sprite.spriteFrame = data.iconSF;
        }
    },

    onCollisionEnter: function (other, self) {


        if (other.name.startsWith('Ball') && other.tag == 0) {
            if (other.getComponent("Ball").fireBall) return;
            
            this.count--;

            if (this.count > 0 && this.useImage) {
                var data = this.items[this.count - 1];
                this.sprite.spriteFrame = data.iconSF;
            }
            else {
                this.schedule(function () {
                    this.node.destroy();
                }, .01, 0);

            }
        }
    },
});
