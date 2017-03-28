var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../setup').parse;

var User = require('./user').User;
var ParseModel = require('./parse').ParseModel;
var ParseCollection = require('./parse').ParseCollection;
var ProxyModel = require('./proxy-models').ProxyModel;
var ProxyCollection = require('./proxy-models').ProxyCollection;

var FavoriteModel = ParseModel.extend({
  urlRoot: function(){
    return parse.BASE_API_URL+'classes/favorites';
  },
  addToFavorite: function(){
    var thisItem = this;
    var objectId = User.current().get('objectId');
    thisItem.set({'collectors' : {
      "__op":"AddRelation",
      "objects":[
        {"__type":"Pointer", "className":"_User", "objectId":objectId}
      ]}
    });
    thisItem.save().then(function(){
      console.log('add to collection 1');
      console.log(thisComic);
    });
  }
});

var FavoriteCollection = ParseCollection.extend({
  baseUrl:'classes/favorites',
  model: FavoriteModel
});

// var FavoriteCharacter = FavoriteModel.extend({
//
// });
//
// var FavoriteSeries = FavoriteModel.extend({
//
// });
//
// var FavoriteEvent = FavoriteModel.extend({
//
// });
//
// var FavCharCollection = ParseCollection.extend({
//
// });
//
// var FavSeriesCollection = ParseCollection.extend({
//
// });
//
// var FavEventCollection = ParseCollection.extend({
//
// });

module.exports = {
  // FavoriteCharacter:FavoriteCharacter,
  FavoriteCollection:FavoriteCollection,
  FavoriteModel:FavoriteModel
  // FavoriteSeries:FavoriteSeries,
  // FavoriteEvent:FavoriteEvent,
  // FavCharCollection:FavCharCollection,
  // FavSeriesCollection:FavSeriesCollection,
  // FavEventCollection:FavEventCollection
};
