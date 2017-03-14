var $ = require('jquery');

//Info to connect with the parse server to handle Users and Collections
var parse = {
  BASE_API_URL: '',
  setup: function(config){
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
  }
};

module.exports = parse;
