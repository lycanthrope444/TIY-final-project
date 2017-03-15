var $ = require('jquery');
var Backbone = require('backbone');

//Info to connect with the parse server to handle Users and Collections
var parse = {
  BASE_API_URL: '',
  initialize: function(config){
    config = config || {};

    if(config.BASE_API_URL){
      this.BASE_API_URL = config.BASE_API_URL;
    }

    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", "lycanthrope");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "nappytime");

        if(config.sessionId){
          xhr.setRequestHeader("X-Parse-Session-Token", sessionId);
        }
      }
    });
  },
  deinitialize: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", null);
        xhr.setRequestHeader("X-Parse-REST-API-Key", null);
        xhr.setRequestHeader("X-Parse-Session-Token", null);
      }
    });
  }
};

module.exports = {
  parse:parse
};
