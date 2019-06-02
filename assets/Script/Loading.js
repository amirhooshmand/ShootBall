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
        this.hinttext.push("       برای اینکه وسط بازی توپ کم نیاری بهتره که قبل بازی\nسه توپ اضافه رو بخری");
        this.hinttext.push("       اگه بتونی جیمی جامپو بگیری، سه توپ اضافه\nجایزه میگیری");
        this.hinttext.push("       تو بعضی مراحل زمان میتونه تیم برنده رو تعیین کنه\nپس حواست بهش باشه");
        
        var rnd = Math.floor(Math.random() * this.hinttext.length);

        this.hintLbl.string = this.hinttext[rnd];
    }

});
