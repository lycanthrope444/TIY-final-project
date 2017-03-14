var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parse = require('./setup');
var landing = require('./components/landing.jsx').LandingContainer;
var login = require('./components/login.jsx').LoginContainer;
var profile = require('./components/profile.jsx').ProfileContainer;
var collection = require('./components/coll-manager.jsx').CollectionContainer;
var itemView = require('./components/itemview.jsx').ItemContainer;

var AppRouter = Backbone.Router.extend({
  initialize:function(){
    parse.setup({
      BASE_API_URL: 'https://lycanthrope.herokuapp.com'
    });
  },
  routes : {
    '':'index',
    'index': 'index',
    'login':'login',
    'profile':'profile',
    'collection':'collection',
    'itemview':'itemView'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(landing),
      document.getElementById('app')
    );
  },
  login: function(){
    ReactDOM.render(
      React.createElement(login),
      document.getElementById('app')
    );
  },
  profile: function(){
    ReactDOM.render(
      React.createElement(profile),
      document.getElementById('app')
    );
  },
  collection: function(){
    ReactDOM.render(
      React.createElement(collection),
      document.getElementById('app')
    );
  },
  itemView: function(){
    ReactDOM.render(
      React.createElement(itemView),
      document.getElementById('app')
    );
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;
