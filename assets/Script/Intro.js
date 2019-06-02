cc.Class({
    extends: cc.Component,

    properties: {

    },
    start() {
        this.step = 0;
        this.anim = this.node.getComponent(cc.Animation);
    },

    onClick() {
        this.step++;
        switch (this.step) {
            case 1: this.anim.play('Intro2'); break;
            case 2:
                cc.find("Canvas").getComponent("MainMenu").teamSelectClickFromIntro();
                this.node.destroy();
                break;
        }

    },
});
