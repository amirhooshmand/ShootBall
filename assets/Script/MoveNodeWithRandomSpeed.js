cc.Class({
    extends: cc.Component,

    properties: {
        elapsedTime:
        {
            default: 0,
            type: cc.Float
        },
        duration:
        {
            default: 1.5,
            type: cc.Float
        },

        startPos:
        {
            default: new cc.Vec2()
        },

        endPos:
        {
            default: new cc.Vec2()
        },
    },

    // onLoad () {},

    start () {
        this.right = true;
        this.duration = 0;

        this.currentTime = 0;
    },   

     update (dt) {
         this.elapsedTime += dt;
         if(this.elapsedTime > this.currentTime + this.duration)
         {
             this.duration = Math.floor((Math.random() * 2.5) + 1);
             this.currentTime = this.elapsedTime;
              

            if(this.right == true)
            {
                var action = cc.moveTo(this.duration, this.endPos.x, this.endPos.y);
                this.right = false;
            }
            else
            {
                var action = cc.moveTo(this.duration, this.startPos.x, this.startPos.y);
                this.right = true;
            }

            this.node.runAction(action);
         }
     },
});
