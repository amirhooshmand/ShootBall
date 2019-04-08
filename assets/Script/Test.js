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
        videoplayer: cc.VideoPlayer
    },

    end: function()
    {
        cc.director.loadScene('Main');
    },

    start () {
        this.videoplayer.play();
    },
    
    callback: function (event) {
        //event is EventCustom, you can use event.detail to get VideoPlayer component
        var videoplayer = event.detail;
        //do whatever you want with videoplayer
        //you can't pass customEventData in this way
        cc.log("SS");
        videoplayer.resume();
     }, 
});
