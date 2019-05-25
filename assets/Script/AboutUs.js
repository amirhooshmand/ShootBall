cc.Class({
    extends: cc.Component,

    properties: {

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
    }
});
