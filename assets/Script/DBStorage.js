cc.Class({
    extends: cc.Component,

    properties: {
        data: "{}"
    },


    onLoad() {
        this.data = cc.sys.localStorage.getItem("data");
        if (this.data == null) this.data = "{}";

        //this.resetAll();
        //if(this.getItem("coin", -1) == -1)
        //this.setItem("coin", 4987);

        //cc.log(this.data);

    },

    resetAll: function () {
        cc.sys.localStorage.setItem("data", "{}");
        this.data = "{}";
    },

    getItem: function (key) {
        var obj = JSON.parse(this.data);
        return obj[key];
    },

    getItem: function (key, defaultValue) {
        var obj = JSON.parse(this.data);
        var out = obj[key];
        if (out == null) out = defaultValue;
        return out;
    },

    setItem: function (key, value) {
        var obj = JSON.parse(this.data);
        obj[key] = value;
        var data = JSON.stringify(obj);

        cc.sys.localStorage.setItem("data", data)
        this.data = data;

        return data;
    },

    save: function () {
        
    }

});
