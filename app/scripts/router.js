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
var favorites = require('./components/favoriteview.jsx').FavoriteContainer;
var about = require('./components/aboutview.jsx').AboutContainer;

var AppRouter = Backbone.Router.extend({
  initialize:function(){
    parse.initialize({
      BASE_API_URL: 'https://lycanthrope.herokuapp.com/'
    });
  },
  routes : {
    '':'index',
    'index': 'index',
    'profile':'profile',
    'collection':'collection',
    'itemview/:searchtype/:id':'itemView',
    'itemview':'itemView',
    'results/:searchtype/:id/:focus':'results',
    'results':'results',
    'top':'results',
    'wishlist':'wishlist',
    'favorites':'favorites',
    'about':'about'
  },
  execute: function(callback, args, name) {
    var user = User.current()
    if (!user && name != 'index') {
      this.navigate('/', {trigger: true});
      return false;
    }

    if(user && name == 'login'){
      this.navigate('', {trigger: true});
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
  itemView: function(searchtype, id){
    ReactDOM.render(
      React.createElement(itemView, {
        id:id,
        searchType:searchtype,
        focus:focus
      }),
      document.getElementById('app')
    );
  },
  results:function(searchtype, id, focus){
    ReactDOM.render(
      React.createElement(resultsView, {
        id:id,
        searchType:searchtype,
        focus:focus
      }),
      document.getElementById('app')
    );
  },
  wishlist:function(){
    ReactDOM.render(
      React.createElement(wishlist),
      document.getElementById('app')
    );
  },
  favorites:function(){
    ReactDOM.render(
      React.createElement(favorites),
      document.getElementById('app')
    );
  },
  about: function(){
    ReactDOM.render(
      React.createElement(about),
      document.getElementById('app')
    );
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;
