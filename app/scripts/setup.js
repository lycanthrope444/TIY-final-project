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
  }
};

//Parse Model - cribbing from notes on 9.1
var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  sync: function(){
    var User = require('./models/user').User;
    var user = User.current();

    if(user){
      parse.initialize({sessionId: user.get('sessionToken')});
    }else{
      parse.initialize();
    }

    var xhr = Backbone.Model.prototype.sync.apply(this, arguments);

    parse.deinitialize();

    return xhr;
  },
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  setPointer: function(field, parseClass, objectId){
    var pointerObject = {
      "__type": "Pointer",
      "className": parseClass,
      "objectId": objectId
    };

    this.set(field, pointerObject);

    return this;
  }
});

//Parse Collection - cribbing from notes on 9.1
var ParseCollection = Backbone.Collection.extend({
  whereClause: {},
  parseWhere: function(field, value, objectId){
    // If an objectId is passed in then we are building a pointer where
    if(objectId){
      value = {
        field: field,
        className: value,
        objectId: objectId,
        '__type': 'Pointer'
      };
    }
    this.whereClause[field] = value;

    return this;
  },
  url: function(){
    var url = this.baseUrl;

    if(Object.keys(this.whereClause).length > 0){
      url += '?where=' + JSON.stringify(this.whereClause);
      this.whereClause = {};
    }

    return url;
  },
  parse: function(data){
    return data.results;
  },
  sync: function(){
    var User = require('./models/user').User;
    var user = User.current();

    if(user){
      parse.initialize({sessionId: user.get('sessionToken')});
    }else{
      parse.initialize();
    }

    var xhr = Backbone.Collection.prototype.sync.apply(this, arguments);

    parse.deinitialize();

    return xhr;
  },
});

module.exports = {
  parse:parse,
  ParseModel:ParseModel,
  ParseCollection:ParseCollection
};
