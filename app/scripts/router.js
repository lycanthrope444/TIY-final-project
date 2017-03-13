var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var AppRouter = Backbone.Router.extend({
  routes : {
    '':'index',
    'login':'login',
    'character': 'character'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(),
      document.getElementById('app')
    );
  },
  login: function(){
    
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
