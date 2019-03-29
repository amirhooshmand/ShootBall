cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var gameManagerNode = cc.find("Canvas/GameManager");
        this.gameManager = gameManagerNode.getComponent("GameManager");

    },

    // update (dt) {},

    onCollisionEnter: function (other, self) {

        if(other.name.startsWith('Ball'))
        {
            var ball = other.getComponent("Ball");
            if(!ball.canGetIt) return;
            
             other.node.destroy();

             
             this.gameManager.out();
        }
 
     },
});
