cc.Class({
    extends: cc.Component,

    properties: {
        clips: {
            type: cc.AudioClip,
            default: [],
            serializable: true,

        },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


        var sound = cc.sys.localStorage.getItem("audio");


        var rnd = Math.floor(Math.random() * this.clips.length);
        var audio = this.node.getComponent(cc.AudioSource);
        audio.clip = this.clips[rnd];
        
        if (sound == 1)
            audio.play();

        var self = this;
        var anim = this.node.getComponent(cc.Animation);
        anim.on('finished', function (event) {
            self.node.destroy();
        });

        this.scheduleOnce(function () {
            //this.node.destroy();
        }, audio.getDuration());
    },

    // update (dt) {},
});
