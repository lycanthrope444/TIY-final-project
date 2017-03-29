var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../setup').parse;
var ParseModel = require('./parse').ParseModel;

var User = ParseModel.extend({
  idAttribute:'objectId',

  urlRoot: function(){
    return parse.BASE_API_URL + 'users';
  },
  updateInfo:function(){

  }
},{
  login: function(credentials, callback){
    var url = parse.BASE_API_URL + 'login?' + $.param(credentials);
    parse.initialize();
    $.get(url).then(function(data) {
      var newUser = new User(data);
      User.store(newUser);
      callback(newUser);
    });
    parse.deinitialize();
  },
  signup: function(creds){
    var newUser = new User(creds);
    newUser.save().then(function(){
      User.store(newUser);
    });
    return newUser;
  },
  logout: function(){
    var url = parse.BASE_API_URL + 'logout';
    parse.initialize();
    $.post(url).then(function() {
      localStorage.removeItem('username');
      Backbone.history.navigate('/index', {trigger: true});
    });

    parse.deinitialize();
  },
  store: function(user){
    localStorage.setItem('username', JSON.stringify(user.toJSON()));
  },
  current: function(){
    var user = localStorage.getItem('username');

    // if no user in local storage, bail
    if(!user){
      return false;
    }

    var currentUser = new User(JSON.parse(user));

    // If we don't have a token, bail
    if(!currentUser.get('sessionToken')){
      return false;
    }

    return currentUser;
  }
});

module.exports = {
  User:User
};
