cc.Class({
    extends: cc.Component,

    properties: {

        titleLable: {
            default: null,
            type: cc.Label
        },
        bodyLable: {
            default: null,
            type: cc.Label
        },
        positiveBtn: {
            default: null,
            type: cc.Button
        },
        negativeBtn: {
            default: null,
            type: cc.Button
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onClick() {
        var anim = this.getComponent(cc.Animation);
        anim.play('DialogOut');
        var self = this;
        anim.on('finished', function (event) {
            self.node.destroy();
        });


    }

    // update (dt) {},
});
