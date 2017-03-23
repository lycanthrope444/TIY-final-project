var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../setup.js').parse;
var User = require('./user.js').User;

//Parse Model - cribbing from notes on 9.1
var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  sync: function(){
    var User = require('./user').User;
    var user = User.current();

    if(user){
      parse.initialize({sessionToken: user.get('sessionToken')});
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
  },
});

//Parse Collection - cribbing from notes on 9.1
var ParseCollection = Backbone.Collection.extend({
  whereClause: {},
  parseWhere: function(field, value, objectId){
    // If an objectId is passed in then we are building a pointer where
    if(objectId){
      value = {
        '__type': 'Pointer',
        className: value,
        objectId: objectId
      };
    }
    this.whereClause[field] = value;
    console.log(this.whereClause);
    return this;
  },
  isRealated: function(value, objectId, relation){

    value = {"$relatedTo":
        {"object":
          {"__type":"Pointer","className":value,"objectId":objectId},
        "key":relation
      }
    };
    this.whereClause = value;
    console.log(this.whereClause);
    return this;
  },
  url: function(){
    var url = parse.BASE_API_URL+this.baseUrl;

    if(Object.keys(this.whereClause).length > 0){
      url += '?where=' + JSON.stringify(this.whereClause);
      this.whereClause = {};
    }
    console.log(url);
    return url;
  },
  parse: function(data){
    return data.results;
  },
  sync: function(){
    var User = require('./user.js').User;
    var user = User.current();

    if(user){
      parse.initialize({sessionToken: user.get('sessionToken')});
    }else{
      parse.initialize();
    }

    var xhr = Backbone.Collection.prototype.sync.apply(this, arguments);

    parse.deinitialize();

    return xhr;
  },
});

//used to store Avatar Pics
var ParseFile = ParseModel.extend({
  urlRoot: function(){
    return parse.BASE_API_URL +'files/'+ this.get('name');
  }
});

module.exports = {
  ParseModel:ParseModel,
  ParseFile:ParseFile,
  ParseCollection:ParseCollection
};
