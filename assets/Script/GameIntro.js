cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {

        this.ball = cc.find("Canvas/ball_intro")
        this.goal = cc.find("Canvas/goal_intro")
        this.item = cc.find("Canvas/item_intro")


        var flag = cc.sys.localStorage.getItem("intro3");

        if (flag != null) {
            this.goal.destroy();
            this.ball.destroy();
            this.item.destroy();

            this.node.destroy();
            return;
        }
        cc.sys.localStorage.setItem("intro3", 1);

        this.ball.active = false;
        this.item.active = false;
    },

    onClick(event, customEventData) {

        switch (customEventData) {
            case "1":
                this.goal.destroy();
                this.ball.active = true;
                break;
            case "2":
                this.ball.destroy();
                this.item.active = true;
                break;
            case "3":
                this.item.destroy();
                this.node.destroy();
                break;
        }

    },
    // update (dt) {},
});
