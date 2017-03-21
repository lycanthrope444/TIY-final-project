var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../setup').parse;
var ParseModel = require('./parse').ParseModel;
var ParseCollection = require('./parse').ParseCollection;

var Avatar = ParseModel.extend({
  urlRoot: function(){
    return parse.BASE_API_URL +'classes/user_info/';
  }
});

var AvatarCollection = ParseCollection.extend({
  model: Avatar,
  baseUrl: 'classes/user_info/'

});

module.exports ={
  Avatar:Avatar,
  AvatarCollection:AvatarCollection
};
