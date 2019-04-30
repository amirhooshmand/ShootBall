cc.Class({
    extends: cc.Component,
 
    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        itemPrefab: {
            default: null,
            type: cc.Prefab,
        },

        content: {
            default: null,
            type: cc.Node
        },
        weekBtn: {
            default: null,
            type: cc.Button
        },
        dayBtn: {
            default: null,
            type: cc.Button
        },
        allBtn: {
            default: null,
            type: cc.Button
        },
        iconVolumeOff: {
            default: null,
            type: cc.SpriteFrame
        },
        iconVolumeOn: {
            default: null,
            type: cc.SpriteFrame
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.second = 20580;
        this.timeLbl = this.node.getChildByName("stadium_scoreboard").getChildByName("TimeLable").getComponent(cc.Label);
        //this.leagueLbl = this.node.getChildByName("stadium_scoreboard").getChildByName("leagueName").getComponent(cc.Label);

        //this.leagueLbl.string = "";
        this.timeLbl.string = this.replaceNum(this.convertToHHMMSS(this.second));

        // Time interval in units of seconds
        var interval = 1;
        // Time of repetition
        var repeat = this.second;
        // Start delay
        var delay = 0;
        this.schedule(function () {

            this.second--;

            this.timeLbl.string = this.replaceNum(this.convertToHHMMSS(this.second));


        }, interval, repeat, delay);

        for (var i = 0; i < 10; i++) {
            const row = cc.instantiate(this.itemPrefab);
            this.content.addChild(row);

            row.getChildByName("numberLable").getComponent(cc.Label).string = this.replaceNum((i + 1).toString());
            row.getChildByName("nameLable").getComponent(cc.Label).string = "name";
            row.getChildByName("coinLable").getComponent(cc.Label).string = this.replaceNum((10 - i + 1).toString());
        }

        this.last = this.weekBtn;
        
    },
    replaceNum: function (input) {//۱۲۳۴۵۶۷۸۹۰
        return input.replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
    },
    close: function () {
        this.node.destroy();
    },

    convertToHHMMSS: function (totalSeconds) {
        var h = Math.floor(totalSeconds / 3600);
        var m = Math.floor((totalSeconds % 3600) / 60);
        var s = Math.floor((totalSeconds % 3600) % 60);

        var hourStr = (h == 0) ? "" : this.DoubleDigitFormat(h) + ":";
        var minuteStr = this.DoubleDigitFormat(m) + ":";
        var secondsStr = this.DoubleDigitFormat(s);

        return hourStr + minuteStr + secondsStr;
    },

    DoubleDigitFormat: function (num) {
        if (num < 10) {
            return ("0" + num);
        }
        return num.toString();
    },

    offBtn: function()
    {
        var sprite = this.dayBtn.getComponent(cc.Sprite);
        sprite.spriteFrame = this.iconVolumeOff;

        sprite = this.weekBtn.getComponent(cc.Sprite);
        sprite.spriteFrame = this.iconVolumeOff;

        sprite = this.allBtn.getComponent(cc.Sprite);
        sprite.spriteFrame = this.iconVolumeOff;
    },

    dayClick: function () {

        this.offBtn();

        var sprite = this.dayBtn.getComponent(cc.Sprite);
        sprite.spriteFrame = this.iconVolumeOn;
    },
    weekClick: function () {
        this.offBtn();

        var sprite = this.weekBtn.getComponent(cc.Sprite);
        sprite.spriteFrame = this.iconVolumeOn;
    },
    allClick: function () {
        this.offBtn();

        var sprite = this.allBtn.getComponent(cc.Sprite);
        sprite.spriteFrame = this.iconVolumeOn;
    },

    // update (dt) {},
});
