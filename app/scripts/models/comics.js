var Backbone = require('backbone');

var parse = require('../setup').parse;

var ParseModel = require('./parse').ParseModel;
var ParseCollection = require('./parse').ParseCollection;
var ProxyModel = require('./proxy-models').ProxyModel;
var ProxyCollection = require('./proxy-models').ProxyCollection;

//Comics will be referred to by their Marvel id#

var Comic = ParseModel.extend({
  urlRoot: function(){
    return parse.BASE_API_URL +'classes/comics';
  },
  getRating: function(){
    //Used to calculate rating
  },
  updateRating: function(rating){
    console.log('method called', rating);
  },
  addToCollection: function(comicId, userId){
    //Used to add to the User's Collection
    console.log('add to collection');

    var comicInfo = new Comic();

    comicInfo.set('User', '_User', this.state.userID);

    avatarInfo.save().then(function(){
      console.log(avatarInfo);
    });

      //This is also a good time to navigate away after the AJAX request finishes

  },
  removeFromCollection: function(){
    //Used to remove from the User's Collection
  }
});

var Series = ParseModel.extend({
  makeFollowed: function(){

  }
});

var SeriesCollection = ParseCollection.extend({
  model: Series
});

var ComicCollection = ParseCollection.extend({
  model: Comic,
  urlRoot: function(){
    return parse.BASE_API_URL +'classes/comics';
  }
});

var ProxyComic = ProxyModel.extend({

});

module.exports = {
  Comic:Comic,
  ComicCollection:ComicCollection,
  Series: Series,
  SeriesCollection:SeriesCollection
};
