var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../setup').parse;

var User = require('./user').User;
var ParseModel = require('./parse').ParseModel;
var ParseCollection = require('./parse').ParseCollection;
var ProxyModel = require('./proxy-models').ProxyModel;
var ProxyCollection = require('./proxy-models').ProxyCollection;

var FavoriteModel = ParseModel.extend({

});

var FavoriteCharacter = FavoriteModel.extend({

});

var FavoriteSeries = FavoriteModel.extend({

});

var FavoriteEvent = FavoriteModel.extend({

});

var FavCharCollection = ParseCollection.extend({

});

var FavSeriesCollection = ParseCollection.extend({

});

var FavEventCollection = ParseCollection.extend({

});

module.exports = {
  FavoriteCharacter:FavoriteCharacter,
  FavoriteSeries:FavoriteSeries,
  FavoriteEvent:FavoriteEvent,
  FavCharCollection:FavCharCollection,
  FavSeriesCollection:FavSeriesCollection,
  FavEventCollection:FavEventCollection
};
