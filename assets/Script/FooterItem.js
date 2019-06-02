cc.Class({
    extends: cc.Component,

    properties: {
        freezEventPrefab: {
            default: null,
            type: cc.Prefab,
        },
        ExcessEventPrefab: {
            default: null,
            type: cc.Prefab,
        },
        fireBallEventPrefab: {
            default: null,
            type: cc.Prefab,
        },
        removeDefEventPrefab: {
            default: null,
            type: cc.Prefab,
        },
    },

    start() {
        this.gameManager = cc.find("Canvas/GameManager").getComponent("GameManager");

        this.DBStorage = cc.find("DBStorage").getComponent("DBStorage");

        //if (this.gameManager.gameDetail.ballCount == -1)
        //this.node.getChildByName("ShopItem3").destroy();
    },

    onItemClick: function (event, id) {

        if (this.gameManager.end) return;


        var defCount = this.DBStorage.getItem("removeDefender", 1);
        var fireCount = this.DBStorage.getItem("fireBall", 1);
        var exteraBall = this.DBStorage.getItem("exteraBall", 1);
        var freezGoalKeeper = this.DBStorage.getItem("freezGoalKeeper", 1);

        if (id == 1 && defCount > 0) { // defCount
            defCount--;
            this.DBStorage.setItem("removeDefender", defCount);
            this.removeDefender();

            var canvas = cc.find("Canvas");
            var eventNode = cc.instantiate(this.removeDefEventPrefab);
            canvas.addChild(eventNode);
            var anim = eventNode.getComponent(cc.Animation);
            anim.on('finished', function (event) { eventNode.destroy(); });

        } else if (id == 2 && fireCount > 0) { // fireCount

            var balls = cc.find("Canvas/Environment/BallParent").children;
            if (balls.length == 0) return;

            fireCount--;
            this.DBStorage.setItem("fireBall", fireCount);
            this.fireBall();

            var canvas = cc.find("Canvas");
            var eventNode = cc.instantiate(this.fireBallEventPrefab);

            canvas.addChild(eventNode);
            var anim = eventNode.getComponent(cc.Animation);
            anim.on('finished', function (event) { eventNode.destroy(); });

        }
        else if (id == 3 && exteraBall > 0 && !this.gameManager.infinityBall) { // exteraBall
            exteraBall--;
            this.DBStorage.setItem("exteraBall", exteraBall);
            this.exteraBall();

            var canvas = cc.find("Canvas");
            var eventNode = cc.instantiate(this.ExcessEventPrefab);
            canvas.addChild(eventNode);
            var anim = eventNode.getComponent(cc.Animation);
            anim.on('finished', function (event) { eventNode.destroy(); });

        }
        else if (id == 4 && freezGoalKeeper > 0) { // freezGoalKeeper
            freezGoalKeeper--;
            this.DBStorage.setItem("freezGoalKeeper", freezGoalKeeper);
            this.freezGoalKeeper();

            var canvas = cc.find("Canvas");
            var eventNode = cc.instantiate(this.freezEventPrefab);
            canvas.addChild(eventNode);
            var anim = eventNode.getComponent(cc.Animation);
            anim.on('finished', function (event) { eventNode.destroy(); });
        }

        this.updateFooter(defCount, fireCount, exteraBall, freezGoalKeeper);
    },
    removeDefender: function () {
        var fp = cc.find("Canvas/Environment").children;

        for (var i = 0; i < fp.length; i++) {
            if (fp[i].name == "DefensePlayer")
                fp[i].destroy();
        }

        var gk = cc.find("Canvas/Environment/GoalKeeper")
        gk.destroy();

        //this.node.getChildByName("ShopItem1").destroy();
    },

    fireBall: function () {
        var balls = cc.find("Canvas/Environment/BallParent").children;
        for (var i = 0; i < balls.length; i++) {
            var b = balls[i].getComponent("Ball");
            b.setFire();
        }
    },

    exteraBall: function () {
        this.gameManager.ballCount += 3;
        this.gameManager.setLableCount();
    },

    freezGoalKeeper: function () {
        var goalKeeper = cc.find("Canvas/Environment/GoalKeeper").getComponent("GoalKeeper");
        goalKeeper.freeze();
    },

    updateFooter: function (defCount, fireCount, exteraBall, freezGoalKeeper) {
        var footer = cc.find("Canvas/footer");

        try { footer.getChildByName("ShopItem1").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(defCount.toString()); } catch (error) { }
        try { footer.getChildByName("ShopItem2").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(fireCount.toString()); } catch (error) { }
        try { footer.getChildByName("ShopItem3").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(exteraBall.toString()); } catch (error) { }
        try { footer.getChildByName("ShopItem4").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(freezGoalKeeper.toString()); } catch (error) { }
    },

    replaceNum: function (input) {//۱۲۳۴۵۶۷۸۹۰
        return input.replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
    },

});
