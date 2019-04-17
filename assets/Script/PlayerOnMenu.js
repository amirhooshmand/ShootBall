cc.Class({
    extends: cc.Component,

    properties: {

        skeletonData:
        {
            type: sp.SkeletonData,
            default: [],
        }

        
    },


    onLoad () {
        this.spine = this.node.getComponent(sp.Skeleton);
    },

    setPlayer:function(selectedteamID)
    {
        this.spine.skeletonData = this.skeletonData[selectedteamID];
        this.spine.animation = "animation";
    }
});
