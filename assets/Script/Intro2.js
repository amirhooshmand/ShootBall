cc.Class({
    extends: cc.Component,

    properties: {

    },

    start() {
        this.step = 0;
        this.anim = this.node.getComponent(cc.Animation);


    },

    onClick(event, customEventData) {
        this.step++;

        switch (customEventData) {
            case "0": if (this.step == 1) this.anim.play('Intro2-2'); break;
            case "1":
                cc.find("Canvas").getComponent("MainMenu").rubikupClick();
                this.node.destroy();
                break;
        }

    },
    // update (dt) {},
});
