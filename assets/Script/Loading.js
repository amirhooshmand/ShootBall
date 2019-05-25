// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hintLbl: {
            default: null,
            type: cc.Label,
        },
        hinttext:{
            default:[],
            type:cc.String
        }
    },

    close: function () {
        this.onDestroy.destroy();
    },

    start() {        
        this.hinttext.push("       هر گل اضافه ای که بزنی امتیاز بیشتری بهت میده");
        this.hinttext.push("       اگه دروازه بان مزاحمت شد بهتره که منجمدش کنی");
        this.hinttext.push("       توپ آتشی همه ی موانع رو از سر راه برمیداره");
        this.hinttext.push("       برای اینکه وسط بازی توپ کم نیاری بهتره از فروشگاه\nسه توپ اضافه رو بخری");
        this.hinttext.push("       اگه بتونی جیمی جامپو بگیری، سه توپ اضافه\nجایزه میگیری");
        
        var rnd = Math.floor(Math.random() * this.hinttext.length);

        this.hintLbl.string = this.hinttext[rnd];
    }

});
