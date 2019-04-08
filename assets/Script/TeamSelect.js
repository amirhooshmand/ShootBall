cc.Class({
    extends: cc.Component,

    properties: {
        TeamPage: {
            default: null,
            type: cc.Prefab,
        },
    },

    start() {
        var teamManagerNode = cc.find("Canvas/TeamManager");
        this.teamManager = teamManagerNode.getComponent("TeamManager");

        var content = cc.find("Canvas/Team PageView/view/content");

       cc.find("DBStorage").getComponent("DBStorage").setItem("استقلال خوزستان", "yes")


        this.page = 1;

        for (var i = 0; i < this.teamManager.teams.length; i++) {
            const teamPage = cc.instantiate(this.TeamPage);
            content.addChild(teamPage);
            var layout = content.getComponent(cc.Layout);
            //layout.type = cc.Layout.HORIZONTAL;
            layout.updateLayout();

            teamPage.getChildByName("team_logo").getChildByName("TeamNameLbl").getComponent(cc.Label).string = " " + this.teamManager.teams[i].name + "  ";
            var button = teamPage.getChildByName("SelectBtn").getComponent(cc.Button);
            var pruches = cc.find("DBStorage").getComponent("DBStorage").getData(this.teamManager.teams[i].name)
            if (pruches != "yes") {
                button.node.getChildByName("BtnLbl").getComponent(cc.Label).string = "سکه  " + this.teamManager.teams[i].price + "  ";
            }

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; //This node is the node to which your event handler code component belongs
            clickEventHandler.component = "TeamSelect";//This is the code file name
            clickEventHandler.handler = "selectTeam";
            clickEventHandler.customEventData = this.teamManager.teams[i].id;

            button.clickEvents.push(clickEventHandler);


            
            cc.loader.loadRes("logo/" + this.teamManager.teams[i].id, cc.SpriteFrame, function (err, spriteFrame) {
                teamPage.getChildByName("team_logo").getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });

            var count = 0;

            for (var j = 0; j < this.teamManager.players.length; j++) {
                if (this.teamManager.players[j].teamID == this.teamManager.teams[i].id) {

                    count++;
                    teamPage.getChildByName("team").getChildByName("Player" + count).getChildByName("jersey").getChildByName("numberLbl").getComponent(cc.Label).string = this.teamManager.players[j].number;
                    if (count == 1) {
                        
                        cc.loader.loadRes("player/body/" + this.teamManager.players[j].bodyColor, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player1").getChildByName("body").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("player/head/" + this.teamManager.players[j].headName, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player1").getChildByName("head").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("jersey/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player1").getChildByName("jersey").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                    }
                    else if (count == 2) {
                        cc.loader.loadRes("player/body/" + this.teamManager.players[j].bodyColor, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player2").getChildByName("body").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("player/head/" + this.teamManager.players[j].headName, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player2").getChildByName("head").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("jersey/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player2").getChildByName("jersey").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                    }
                    else if (count == 3) {
                        cc.loader.loadRes("player/body/" + this.teamManager.players[j].bodyColor, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player3").getChildByName("body").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("player/head/" + this.teamManager.players[j].headName, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player3").getChildByName("head").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });
                        cc.loader.loadRes("jersey/" + this.teamManager.players[j].teamID, cc.SpriteFrame, function (err, spriteFrame) {
                            teamPage.getChildByName("team").getChildByName("Player3").getChildByName("jersey").getComponent(cc.Sprite).spriteFrame = spriteFrame;
                            //cc.log("k");
                        });
                    }
                }
            }
        }

        this.node.getComponent(cc.PageView).content = content;

        var content = cc.find("Canvas/Team PageView/view/content");
        //cc.log(content.width / 16);
        //cc.log(content.x);
        this.startX = content.x;
        //this.nextPage();
    },

    nextPage: function () {
        var pView = this.node.getComponent(cc.PageView);
        if (pView.getCurrentPageIndex() + 1 == pView.getPages().length) return;

        pView.setCurrentPageIndex((pView.getCurrentPageIndex() + 1) % pView.getPages().length);
    },

    previousPage: function () {
        var pView = this.node.getComponent(cc.PageView);
        if (pView.getCurrentPageIndex() + 1 == 1) return;

        pView.setCurrentPageIndex((pView.getPages().length + pView.getCurrentPageIndex() - 1) % pView.getPages().length);
    },

    selectTeam: function (event, customEventData) {
       cc.find("DBStorage").getComponent("DBStorage").setItem("team", customEventData);
        //cc.log("S: " + customEventData);
        cc.find("Canvas").getComponent("MainMenu").setPlayer(customEventData);
        
        this.close();
    },

    close: function()
    {
        this.node.destroy();
    }
});

