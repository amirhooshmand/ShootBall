cc.Class({
    extends: cc.Component,

    properties: {

    },

    start() {
        this.gameManager = cc.find("Canvas/GameManager").getComponent("GameManager");
        this.DBStorage = cc.find("DBStorage").getComponent("DBStorage");

    },

    onItemClick: function (event, id) {

        var defCount = this.DBStorage.getItem("removeDefender", 1);
        var fireCount = this.DBStorage.getItem("fireBall", 1);
        var exteraBall = this.DBStorage.getItem("exteraBall", 1);
        var freezGoalKeeper = this.DBStorage.getItem("freezGoalKeeper", 1);

        if (id == 1 && defCount > 0) { // defCount
            defCount--;
            this.DBStorage.setItem("removeDefender", defCount);
            this.removeDefender();

        } else if (id == 2 && fireCount > 0) { // fireCount
            fireCount--;
            this.DBStorage.setItem("fireBall", fireCount);
            this.fireBall();
        }
        else if (id == 3 && exteraBall > 0) { // exteraBall
            exteraBall--;
            this.DBStorage.setItem("exteraBall", exteraBall);
            this.exteraBall();
        }
        else if (id == 4 && freezGoalKeeper > 0) { // freezGoalKeeper
            freezGoalKeeper--;
            this.DBStorage.setItem("freezGoalKeeper", freezGoalKeeper);
            this.freezGoalKeeper();
        }

        this.updateFooter(defCount, fireCount, exteraBall, freezGoalKeeper);
    },
    removeDefender: function () {

    },

    fireBall: function () {

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

        footer.getChildByName("ShopItem1").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(defCount.toString());
        footer.getChildByName("ShopItem2").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(fireCount.toString());
        footer.getChildByName("ShopItem3").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(exteraBall.toString());
        footer.getChildByName("ShopItem4").getChildByName("count").getComponent(cc.Label).string = this.replaceNum(freezGoalKeeper.toString());
    },

    replaceNum: function (input) {//۱۲۳۴۵۶۷۸۹۰
        return input.replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
    },

});
