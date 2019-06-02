cc.Class({
    extends: cc.Component,

    properties: {
        soundOnIcon: {
            default: null,
            type: cc.SpriteFrame
        },
        soundOffIcon: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    start() {
        var sound = cc.sys.localStorage.getItem("audio");
        if (sound == null)
            cc.sys.localStorage.setItem("audio", 1);

        var bgAudio = cc.find("Canvas/BackgroundMusic").getComponent(cc.AudioSource);

        if (sound == 0) {
            this.node.getComponent(cc.Sprite).spriteFrame = this.soundOffIcon;
        }
        else {
            bgAudio.play();
        }
    },

    soundClick() {
        var sound = cc.sys.localStorage.getItem("audio");

        var bgAudio = cc.find("Canvas/BackgroundMusic").getComponent(cc.AudioSource);


        if (sound == 1) {
            this.node.getComponent(cc.Sprite).spriteFrame = this.soundOffIcon;
            bgAudio.pause();
            cc.sys.localStorage.setItem("audio", 0);
        }
        else {
            this.node.getComponent(cc.Sprite).spriteFrame = this.soundOnIcon;
            if (bgAudio.getCurrentTime() == 0)
                bgAudio.play();
            else
                bgAudio.resume();
                
            cc.sys.localStorage.setItem("audio", 1);
        }
    }

});
