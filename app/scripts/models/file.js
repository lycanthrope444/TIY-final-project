var Backbone = require('backbone');

var parse = require('../setup.js').parse;

//used to store Avatar Pics
var ParseFile = Backbone.Model.extend({
  urlRoot: function(){
    return parse.BASE_API_URL +'files/'+ this.get('name');
  }
});

module.exports = {
  ParseFile:ParseFile
};
