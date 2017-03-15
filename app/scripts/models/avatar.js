var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../setup').parse;
var ParseModel = require('./parse').ParseModel;

var Avatar = setup.ParseModel.extend({
  idAttribute:'objectId'
});
