cc.Class({
    extends: cc.Component,

    properties: {

    },

     onLoad () {
         cc.director.getPhysicsManager().enabled = true;
         cc.director.getCollisionManager().enabled = true;
     },

});
