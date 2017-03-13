var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var landing = require('./components/landing.jsx').LandingContainer;
var login = require('./components/login.jsx').LoginContainer;
var profile = require('./components/profile.jsx').ProfileContainer;

var AppRouter = Backbone.Router.extend({
  routes : {
    '':'index',
    'index': 'index',
    'login':'login',
    'profile':'profile',
    'character': 'character'
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
  character: function(){
    ReactDOM.render(
      React.createElement(),
      document.getElementById('app')
    );
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;
