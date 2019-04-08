cc.Class({
    extends: cc.Component,

    properties: {
            userlable:{
                default: null,
                type: cc.Label
            },
            
            responseTxt:"testing..."
    },

     onLoad () {
         cc.director.getPhysicsManager().enabled = true;
         //cc.director.getPhysicsManager().gravity = new cc.Vec2(0,-8000);
     
         cc.director.getCollisionManager().enabled = true;
     },


     createCORSRequest: function (method, url) {
        var xhr = cc.loader.getXMLHttpRequest();
        if ("withCredentials" in xhr) {
      
          // Check if the XMLHttpRequest object has a "withCredentials" property.
          // "withCredentials" only exists on XMLHTTPRequest2 objects.
          xhr.open(method, url, true);
      
        } else if (typeof XDomainRequest != "undefined") {
      
          // Otherwise, check if XDomainRequest.
          // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
          xhr = new XDomainRequest();
          xhr.open(method, url);
      
        } else {
      
          // Otherwise, CORS is not supported by the browser.
          xhr = null;
      
        }
        return xhr;
      },
    
     start(){
        /*var xhr = cc.loader.getXMLHttpRequest();
        var url = "https://webapp.rubika.ir/";

        xhr.open( "POST", url );
        xhr.withCredentials = true;
        xhr.setRequestHeader( "Content-Type", "application/json" );
        xhr.setRequestHeader( "Token", "NGDLPYOULRCSIQJBFSGITSTGCLQQYQDBEPDAZYAYBQFWOIOYZGRLOIHUNXJDHXWU" );
        var arg = "{\"method\" : \"getUserInfo\", \"api_version\" : 1, \"data\" : {\"user_token\" : \"" + androidApp.getUserToken() + "\"}}";
        xhr.send(arg);                 
        xhr.onreadystatechange = this.xhrCallback;*/

        var url = "http://rubika1.rakhtkan.net/userApi.php";
        var xhr = this.createCORSRequest("POST", url);
        if (!xhr) {
          cc.log('CORS not supported');
        }

        xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
        var arg = "app_token=NGDLPYOULRCSIQJBFSGITSTGCLQQYQDBEPDAZYAYBQFWOIOYZGRLOIHUNXJDHXWU&user_token=";// + androidApp.getUserToken();//"2505wjffrqluhzhzitcbhwbpfqxogmqn";
        xhr.send(arg);                 
        xhr.onreadystatechange = this.xhrCallback;
     },

     xhrCallback: function (event) {
        this.canvas = cc.director.getScene().getChildByName('Canvas');
        if(typeof event == 'undefined'){
            this.canvas.getChildByName('New Label').getComponent(cc.Label).string = "event is undefined";
            return;
        }
        if (event.currentTarget.readyState === 4 && (event.currentTarget.status >= 200 && event.currentTarget.status < 300)) {
            var obj = JSON.parse(this.responseText);
            if(obj.data.status == "Done")
            {
              this.canvas.getChildByName('New Label').getComponent(cc.Label).string = "خوش آمدید " + obj.data.user_data.username;
            }
        }
    },

     update (dt) {
         //this.userlable.string = androidApp.getUserToken();
     },

});
