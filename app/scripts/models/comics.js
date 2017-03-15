var Backbone = require('backbone');

var ParseModel = require('./parse').ParseModel;
var ParseCollection = require('./parse').ParseCollection;

var Comic = ParseModel.extend({

});

var SeriesModel = ParseModel.extend({

});

var ComicCollection = ParseCollection.extend({
  model: Comic
});


module.exports = {
  Comic:Comic,
  SeriesModel: SeriesModel,
  ComicCollection:ComicCollection
};
