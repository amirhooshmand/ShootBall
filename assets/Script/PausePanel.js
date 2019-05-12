cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onMenuClick() {
        var dbData = cc.find("DBStorage").getComponent("DBStorage").data;

        cc.director.loadScene("StartMenu", function (err, data) {
            var loginNode = cc.director.getScene();
            var db = loginNode.getChildByName('DBStorage').getComponent("DBStorage");
            db.load(dbData);
        });
    },
    onPlayClick() {
        cc.director.getPhysicsManager().enabled = true;
        this.close();
    },
    onReplayClick() {

        var dbData = cc.find("DBStorage").getComponent("DBStorage").data;
        var datas = cc.find("Canvas/GameManager").getComponent("GameManager").gameDetail;

        cc.director.loadScene(this.getSceneName(), function (err, data) {
            var loginNode = cc.director.getScene();
            var containerLogin = loginNode.getChildByName('Canvas').getChildByName('GameManager');
            var db = loginNode.getChildByName('DBStorage').getComponent("DBStorage");
            db.load(dbData);

            containerLogin.getComponent("GameManager").gameDetail = datas;
        });
    },

    close() {
        var anim = this.getComponent(cc.Animation);
        anim.play('DialogOut');
        var self = this;
        anim.on('finished', function (event) {
            self.node.destroy();
        });
    },

    getSceneName: function () {
        var sceneName
        var _sceneInfos = cc.game._sceneInfos
        for (var i = 0; i < _sceneInfos.length; i++) {
            if (_sceneInfos[i].uuid == cc.director._scene._id) {
                sceneName = _sceneInfos[i].url
                sceneName = sceneName.substring(sceneName.lastIndexOf('/') + 1).match(/[^\.]+/)[0]
            }

        }

        return sceneName
    },
});
