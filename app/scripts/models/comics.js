var Backbone = require('backbone');

var parse = require('../setup').parse;

var User = require('./user').User;
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
  addToCollection: function(){
    var thisComic = this;
    this.save().then(function(){
      var objectId = User.current().get('objectId');
      console.log('add to collection');
      thisComic.set({'collectors' : {
        "__op":"AddRelation",
        "objects":[
          {"__type":"Pointer", "className":"_User", "objectId":objectId}
        ]
      }});

      thisComic.save().then(function(){
        console.log('add to collection');
      });
    });

  },
  removeFromCollection: function(){
    //Used to remove from the User's Collection
    var thisComic = this;
    this.save().then(function(){
      var objectId = User.current().get('objectId');
      console.log('add to collection');
      thisComic.set({'collectors' : {
        "__op":"AddRelation",
        "objects":[
          {"__type":"Pointer", "className":"_User", "objectId":objectId}
        ]
      }});

      thisComic.save().then(function(){
        console.log('add to collection');
      });
    });
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
