cc.Class({
    extends: cc.Component,

    properties: {

        gameDetail: "",
        ballCount: 5,
        awayGoal: 0,
        homeGoal: 0,

        forwardNormal: {
            default: null,
            type: cc.SpriteFrame
        },

        goalEventPrefab: {
            default: null,
            type: cc.Prefab,
        },

        pausePrefab: {
            default: null,
            type: cc.Prefab,
        },

        timeUpEventPrefab: {
            default: null,
            type: cc.Prefab,
        },
        PenaltiPrefab: {
            default: null,
            type: cc.Prefab,
        },
        JimyJumpPrefab: {
            default: null,
            type: cc.Prefab,
        },

        infinityBall: false,
        end: false,
    },


    start() {


        var sound = cc.sys.localStorage.getItem("audio");
        var bgAudio = cc.find("Canvas/Background Audio").getComponent(cc.AudioSource);

        if (sound == 0) {
            bgAudio.node.destroy();
        }
        else {
            bgAudio.play();
        }

        self = this;

        this.ballCount = this.gameDetail.ballCount;

        this.timeLbl = cc.find("Canvas/TimeLable").getComponent(cc.Label);
        this.DBStorage = cc.find("DBStorage").getComponent("DBStorage");

        this.awayGoal = this.gameDetail.awayGoal;
        this.homeGoal = this.gameDetail.homeGoal;

        this.ballParent = cc.find("Canvas/Environment/BallParent");

        if (this.ballCount != -1)
            this.jimyJump();
        //cc.log(this.gameDetail);

        if (this.gameDetail.time == null) { /*cc.director.loadScene("StartMenu");*/ this.infinityBall = true; this.newBall(0.1); return; }

        if (this.gameDetail.time == 0) this.timeLbl.destroy();
        else {
            this.timeLbl.string = this.replaceNum(this.gameDetail.time.toString());

            this.second = this.gameDetail.time;

            // Time interval in units of seconds
            var interval = 1;
            // Time of repetition
            var repeat = this.second - 1;
            // Start delay
            var delay = 0;
            this.schedule(function () {
                this.second--;
                this.timeLbl.string = this.replaceNum(this.second.toString());

                if (this.second == 0) {
                    this.endMatch();

                    var canvas = cc.find("Canvas");
                    const timeEvent = cc.instantiate(this.timeUpEventPrefab);
                    canvas.addChild(timeEvent);
                }
            }, interval, repeat, delay);
        }

        cc.loader.loadRes("player/forward/normal/" + this.gameDetail.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            var parent = cc.find("Canvas/Environment");
            for (var i = 0; i < parent.children.length; i++) {
                var childById = parent.children[i];
                var name = childById.name;


                if (name.startsWith("ForwardPlayer")) {
                    var sprite = childById.getChildByName("player").getComponent(cc.Sprite);
                    sprite.spriteFrame = spriteFrame;
                }
            }
        });

        cc.loader.loadRes("player/defence/normal/" + this.gameDetail.awayID, cc.SpriteFrame, function (err, spriteFrame) {
            var parent = cc.find("Canvas/Environment");
            for (var i = 0; i < parent.children.length; i++) {
                var childById = parent.children[i];
                var name = childById.name;

                if (name == "DefensePlayer") {
                    var sprite = childById.getComponent(cc.Sprite);
                    sprite.spriteFrame = spriteFrame;
                }
            }
        });

        cc.loader.loadRes("player/playMaker/normal/" + this.gameDetail.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            var parent = cc.find("Canvas/Environment");
            for (var i = 0; i < parent.children.length; i++) {
                var childById = parent.children[i];
                var name = childById.name;

                if (name == "PlayMaker") {
                    var sprite = childById.getChildByName("player").getComponent(cc.Sprite);
                    sprite.spriteFrame = spriteFrame;
                }
            }
        });

        if (this.ballCount == -1) {
            this.infinityBall = true;
        } else { }

        this.setLableCount();

        this.setFooter();

        this.newBall(0.1);
        this.setScoreboardGoal();
        this.setScoreboardLogo();
    },

    jimyJump() {
        if (this.gameDetail.ballCount - this.gameDetail.awayGoal <= 2) {
            var rnd = Math.floor(Math.random() * 11);
            if (rnd >= 7) {
                var time = (Math.random() * 11) + 10
                cc.log("time: " + time);
                this.scheduleOnce(function () {
                    var environment = cc.find("Canvas/Environment");
                    const jj = cc.instantiate(this.JimyJumpPrefab);
                    environment.addChild(jj);
                }, time);
            }
        }
    },

    goal: function () {
        this.homeGoal++;
        this.newBall(2);
        this.setScoreboardGoal();

        var canvas = cc.find("Canvas");

        if (canvas.getChildByName("goalEvent")) {
            canvas.getChildByName("goalEvent").getComponentInChildren(cc.Label).string = this.replaceNum(this.homeGoal.toString() + " - " + this.awayGoal.toString());
            return;
        }

        const goalEvent = cc.instantiate(this.goalEventPrefab);
        canvas.addChild(goalEvent);
        goalEvent.getComponentInChildren(cc.Label).string = this.replaceNum(this.homeGoal.toString() + " - " + this.awayGoal.toString());
    },

    out: function () {
        this.newBall(0.2);
        //this.awayGoal++;
    },

    newBall: function (delay) {



        this.scheduleOnce(function () {

            for (var i = 0; i < this.ballParent.children.length; i++) {
                var childById = this.ballParent.children[i];
                cc.log(childById.name.startsWith('Ball'));
                if (childById.name.startsWith('Ball')) return;
            }

            if (this.ballCount > 0 || this.infinityBall) {
                var addBallNode = cc.find("Canvas/Environment/AddBall");
                var addBall = addBallNode.getComponent("AddBall");
                addBall.initBall();
            }
            else
                this.endMatch();

        }, delay);
    },

    shoot: function () {

        if (this.infinityBall) return;

        this.ballCount--;

        if (this.ballCount >= 0)
            this.setLableCount();
    },

    pause() {

        var canvas = cc.find("Canvas");
        const pause = cc.instantiate(this.pausePrefab);
        canvas.addChild(pause);

        cc.director.getPhysicsManager().enabled = false;
    },

    endMatch: function () {
        this.end = true;
        this.unscheduleAllCallbacks();

        var sound = cc.sys.localStorage.getItem("audio");

        cc.director.getPhysicsManager().enabled = false;
        if (this.awayGoal != this.homeGoal && sound == 1)
            this.node.getChildByName("EndMatch").getComponent(cc.AudioSource).play();

        this.scheduleOnce(function () {
            var detail = [];
            detail.homeID = this.gameDetail.homeID;
            detail.awayID = this.gameDetail.awayID;
            detail.homeGoal = this.homeGoal;
            detail.awayGoal = this.awayGoal;
            detail.cup = this.getSceneName().substring(5, 6);
            detail.week = this.getSceneName().substring(7);

            if (this.awayGoal == this.homeGoal)
                this.draw();
            else {
                if (this.awayGoal < this.homeGoal)
                    detail.win = true;
                else
                    detail.win = false;
                var dbData = this.DBStorage.data;
                var gd = this.gameDetail;

                cc.director.loadScene("StartMenu", function (err, data) {
                    var loginNode = cc.director.getScene();
                    var containerLogin = loginNode.getChildByName('Canvas');
                    var db = loginNode.getChildByName('DBStorage').getComponent("DBStorage");
                    db.load(dbData);

                    containerLogin.getComponent("MainMenu").openEndMatch(detail, gd);
                });
            }
        }, 2);
    },

    win: function () {

    },
    lose: function () {

    },
    draw: function () {

        var footer = cc.find("Canvas/footer");
        footer.destroy();

        var environment = cc.find("Canvas/Environment");
        environment.destroy();

        //var addBallNode = cc.find("Canvas/Environment/AddBall");
        //addBallNode.removeAllChildren();

        var canvas = cc.find("Canvas");
        const p = cc.instantiate(this.PenaltiPrefab);
        canvas.addChild(p);
        var penalti = p.getComponent("Penalti");
        penalti.homeID = this.gameDetail.homeID;
        penalti.awayID = this.gameDetail.awayID;
    },

    penaltiResualt(goal) {
        var delay = 2.6;

        var sound = cc.sys.localStorage.getItem("audio");

        if (sound == 1)
            this.node.getChildByName("EndMatch").getComponent(cc.AudioSource).play();

        if (goal) {
            var canvas = cc.find("Canvas");
            const goalEvent = cc.instantiate(this.goalEventPrefab);
            canvas.addChild(goalEvent);
            goalEvent.getComponentInChildren(cc.Label).string = "پنالتی";
        } else delay = 1.7;

        this.scheduleOnce(function () {

            cc.director.getPhysicsManager().enabled = false;

            var detail = [];
            detail.homeID = this.gameDetail.homeID;
            detail.awayID = this.gameDetail.awayID;
            detail.homeGoal = this.homeGoal;
            detail.awayGoal = this.awayGoal;
            detail.cup = this.getSceneName().substring(5, 6);
            detail.week = this.getSceneName().substring(7);
            detail.win = goal;


            var dbData = this.DBStorage.data;
            var gd = this.gameDetail;

            cc.director.loadScene("StartMenu", function (err, data) {
                var loginNode = cc.director.getScene();
                var containerLogin = loginNode.getChildByName('Canvas');
                var db = loginNode.getChildByName('DBStorage').getComponent("DBStorage");
                db.load(dbData);

                containerLogin.getComponent("MainMenu").openEndMatch(detail, gd);
            });
        }, delay);
    },

    setScoreboardGoal: function () {
        var lable = cc.find("Canvas/Scoreboard/GoalLable").getComponent(cc.Label);
        lable.string = this.replaceNum(this.homeGoal.toString() + " - " + this.awayGoal.toString());
    },

    getSceneName: function () {
        var sceneName
        var _sceneInfos = cc.game._sceneInfos
        for (var i = 0; i < _sceneInfos.length; i++) {
            if (_sceneInfos[i].uuid == cc.director._scene._id) {
                sceneName = _sceneInfos[i].url
                sceneName = sceneName.substring(sceneName.lastIndexOf('/') + 1).match(/[^\.]+/)[0]
            }

        }

        return sceneName
    },

    setScoreboardLogo: function () {
        var self = this;

        var homeSprite = cc.find("Canvas/Scoreboard/HomeLogo/Mask/Logo").getComponent(cc.Sprite);
        cc.loader.loadRes("logo/" + self.gameDetail.homeID, cc.SpriteFrame, function (err, spriteFrame) {
            homeSprite.spriteFrame = spriteFrame;
        });
        var awaySprite = cc.find("Canvas/Scoreboard/AwayLogo/Mask/Logo").getComponent(cc.Sprite);
        cc.loader.loadRes("logo/" + self.gameDetail.awayID, cc.SpriteFrame, function (err, spriteFrame) {
            awaySprite.spriteFrame = spriteFrame;
        });
    },

    setLableCount: function () {
        var lable = cc.find("Canvas/balls").getComponentInChildren(cc.Label);
        if (this.ballCount == -1)
            lable.string = this.replaceNum("∞");
        else
            lable.string = this.replaceNum(this.ballCount.toString());
    },

    setFooter: function (defCount, fireCount, exteraBall, freezGoalKeeper) {
        var footer = cc.find("Canvas/footer");

        footer.getChildByName("ShopItem1").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(this.gameDetail.defCount.toString());
        footer.getChildByName("ShopItem2").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(this.gameDetail.fireCount.toString());
        footer.getChildByName("ShopItem3").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(this.gameDetail.exteraBall.toString());
        footer.getChildByName("ShopItem4").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(this.gameDetail.freezGoalKeeper.toString());
    },

    replaceNum: function (input) {//۱۲۳۴۵۶۷۸۹۰
        return input.replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
    },


});
