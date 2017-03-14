var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../setup').parse;
var setup = require('../setup');

var Avatar = setup.ParseModel.extend({
  idAttribute:'objectId'
});
