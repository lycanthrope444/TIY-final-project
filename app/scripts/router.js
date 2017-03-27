var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parse = require('./setup').parse;
var User = require('./models/user').User;
var landing = require('./components/landing.jsx').LandingContainer;
var login = require('./components/login.jsx').LoginContainer;
var profile = require('./components/profile.jsx').ProfileContainer;
var collection = require('./components/collectionview.jsx').CollectionContainer;
var wishlist = require('./components/wishlistview.jsx').WishlistContainer;
var itemView = require('./components/itemview.jsx').ItemContainer;
var resultsView = require('./components/results.jsx').ResultsContainer;

var AppRouter = Backbone.Router.extend({
  initialize:function(){
    parse.initialize({
      BASE_API_URL: 'https://lycanthrope.herokuapp.com/'
    });
  },
  routes : {
    '':'index',
    'index': 'index',
    'login':'login',
    'profile':'profile',
    'collection':'collection',
    'itemview/:searchtype/:id/:focus':'itemView',
    'itemview/:searchtype/:id':'itemView',
    'itemview':'itemView',
    'results':'results',
    'top':'results',
    'wishlist':'wishlist'
  },
  execute: function(callback, args, name) {
    var user = User.current()
    if (!user && name != 'login') {
      this.navigate('', {trigger: true});
      return false;
    }

    if(user && name == 'login'){
      this.navigate('/login', {trigger: true});
      return false;
    }

    return Backbone.Router.prototype.execute.apply(this, arguments);
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
  itemView: function(searchtype, id, focus){
    ReactDOM.render(
      React.createElement(itemView, {
        id:id,
        searchType:searchtype,
        focus:focus
      }),
      document.getElementById('app')
    );
  },
  results:function(){
    ReactDOM.render(
      React.createElement(resultsView),
      document.getElementById('app')
    );
  },
  wishlist:function(){
    ReactDOM.render(
      React.createElement(wishlist),
      document.getElementById('app')
    );
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;
