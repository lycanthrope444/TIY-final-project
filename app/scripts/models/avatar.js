var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../setup').parse;
var ParseModel = require('./parse').ParseModel;

var Avatar = ParseModel.extend({
  urlRoot: function(){
    return parse.BASE_API_URL +'classes/user_info';
  }
});

module.exports ={
  Avatar:Avatar
};
