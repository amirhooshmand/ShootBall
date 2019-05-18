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
        loadingBall: {
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
        this.DBStorage = cc.find("DBStorage").getComponent("DBStorage");


        var getCurrentTime = this.DBStorage.getDateTime();
        var remainDays = 7 - Math.abs(getCurrentTime.getDay() - 5);

        var newDate = this.addDays(getCurrentTime, remainDays);
        newDate.setHours(24, 0, 0, 0);

        var remaining = this.getTimeRemaining(newDate);


        this.second = (remaining.days * 24) + (remaining.hours * 60 * 60) + (remaining.minutes * 60) + (remaining.seconds);
        this.timeLbl = this.node.getChildByName("stadium_scoreboard").getChildByName("TimeLable").getComponent(cc.Label);
        this.dayLbl = this.node.getChildByName("stadium_scoreboard").getChildByName("DayLable").getComponent(cc.Label);
        this.rozLbl = this.node.getChildByName("stadium_scoreboard").getChildByName("RozLable").getComponent(cc.Label);
        //this.leagueLbl = this.node.getChildByName("stadium_scoreboard").getChildByName("leagueName").getComponent(cc.Label);

        //this.leagueLbl.string = "";
        this.dayLbl.string = this.replaceNum(remaining.days.toString());
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

            remaining = this.getTimeRemaining(newDate);

            if (remaining.days <= 0) {
                this.dayLbl.node.active = false;
                this.rozLbl.node.active = false;
            }

        }, interval, repeat, delay);


        this.clearList();

        this.last = this.weekBtn;

        this.getLeaderBoard("weekly");
    },
    addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },

    addItem(data) {
        const row = cc.instantiate(this.itemPrefab);
        this.content.addChild(row);

        row.getChildByName("numberLable").getComponent(cc.Label).string = this.replaceNum(data.rank);
        row.getChildByName("nameLable").getComponent(cc.Label).string = (data.me == "1") ? "    شما" : "    " + data.name + "    ";
        row.getChildByName("coinLable").getComponent(cc.Label).string = this.replaceNum(data.total);
    },
    getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    },

    clearList() {
        this.content.removeAllChildren();
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

    offBtn: function () {
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

        this.loadingBall.active = true;

        this.clearList();
        this.getLeaderBoard("daily");
    },
    weekClick: function () {
        this.offBtn();

        var sprite = this.weekBtn.getComponent(cc.Sprite);
        sprite.spriteFrame = this.iconVolumeOn;

        this.loadingBall.active = true;

        this.clearList();
        this.getLeaderBoard("weekly");
    },
    allClick: function () {
        this.offBtn();

        var sprite = this.allBtn.getComponent(cc.Sprite);
        sprite.spriteFrame = this.iconVolumeOn;

        this.loadingBall.active = true;

        this.clearList();
        this.getLeaderBoard("total");
    },

    createCORSRequest: function (method, url) {
        var xhr = cc.loader.getXMLHttpRequest();
        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

        }
        return xhr;
    },
    getLeaderBoard: function (type) {

        //xhr.abort();

        var url = "http://rubika1.rakhtkan.net/getLeaderBoard.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
            cc.log('CORS not supported');
        }

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var arg = "user=" + this.DBStorage.getItem("userID") + "&type=" + type;

        try { xhr.send(arg); }
        catch (error) { cc.log(error); }

        xhr.onreadystatechange = this.xhrGetCallback;
    },

    xhrGetCallback: function (event) {
        var lb = cc.director.getScene().getChildByName('Canvas').getChildByName('LeaderBoard').getComponent("Leaderboard");

        if (typeof event == 'undefined') {

            return;
        }
        if (event.currentTarget.readyState === 4 && (event.currentTarget.status >= 200 && event.currentTarget.status < 300)) {
            cc.log(this.responseText);

            lb.loadingBall.active = false;
            lb.clearList();

            var json = JSON.parse(this.responseText);

            for (let i = 0; i < json.length; i++) {
                if (i != 0) {
                    var node = new cc.Node('Space');
                    node.height = 100;
                    lb.content.addChild(node);
                }

                for (let j = 0; j < json[i].length; j++) {
                    lb.addItem(json[i][j]);
                }
            }
        }
    },
});
