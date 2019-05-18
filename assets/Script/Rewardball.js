cc.Class({
    extends: cc.Component,

    properties: {
        flag: false
    },

    onCollisionEnter: function (other, self) {
        if (other.name.startsWith("Box") && self.tag == 0 && !this.flag) {
            this.flag = true;

            var rewardBox = other.getComponent("RewardBox");
            rewardBox.open(true);
        }
    },
});
