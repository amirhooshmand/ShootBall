cc.Class({
    extends: cc.Component,

    properties: {
        dialogPrefab: {
            default: null,
            type: cc.Prefab,
        },
    },

    start() {

    },

    privacy() {
        this.openInNewTab("http://shootballista.com/privacy.html");
    },
    termsAndConditions() {
        this.openInNewTab("http://shootballista.com/Terms-and-Conditions.html");
    },

    contactUs() {
        this.openInNewTab("http://shootballista.com/contact-us.html");
    },
    website() {
        this. openInNewTab("http://e-bazi.ir/");
    },


    openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    },

    close(){
        this.node.destroy();
    },

    singout(){
        const dialog = cc.instantiate(this.dialogPrefab);
        cc.find("Canvas").addChild(dialog);
        var d = dialog.getComponent("Dialog");
        d.titleLable.string = "خروج از بازی";
        d.bodyLable.string = "میخوای از بازی خارح بشی؟";
        d.positiveBtn.getComponentInChildren(cc.Label).string = "بیخیال";
        d.negativeBtn.getComponentInChildren(cc.Label).string = "آره";

        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //This node is the node to which your event handler code component belongs
        clickEventHandler.component = "AboutUs";//This is the code file name
        clickEventHandler.handler = "exitFromGame";
        clickEventHandler.customEventData = customEventData;

        d.negativeBtn.clickEvents.push(clickEventHandler);
    },

    exitFromGame(){
        cc.sys.localStorage.clear();
        window.close();
    }
});
