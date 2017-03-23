var $ = require('jquery');
var Backbone = require('backbone');

var parse = require('../setup').parse;

var User = require('./user').User;
var ParseModel = require('./parse').ParseModel;
var ParseCollection = require('./parse').ParseCollection;
var ProxyModel = require('./proxy-models').ProxyModel;
var ProxyCollection = require('./proxy-models').ProxyCollection;

//Comics will be referred to by their Marvel id#

var Comic = ParseModel.extend({
  marvelId : '',
  url:function(){
    var url = parse.BASE_API_URL + 'classes/comics/';
    console.log(url);
    return url;
  },
  getRating: function(){
    //Used to calculate rating

  },
  updateRating: function(rating){
    console.log('method called', rating);
  },
  addToCollection: function(){

    var thisComic = this;
    var objectId = User.current().get('objectId');
    thisComic.set({'collectors' : {
      "__op":"AddRelation",
      "objects":[
        {"__type":"Pointer", "className":"_User", "objectId":objectId}
      ]}
    });
    thisComic.save().then(function(){
      console.log('add to collection 1');
      console.log(thisComic);
    });
  },
  removeFromCollection: function(){
    //Used to remove from the User's Collection

    var thisComic = this;
    var objectId = User.current();
    var id = this.id;

    this.set({'collectors' : {
      "__op":"RemoveRelation",
      "objects":[{
        "__type":"Pointer",
        "className":"_User",
        "objectId":objectId
      }]
    }});

    console.log(parse.BASE_API_URL + 'classes/comics/'+id);
    var url =parse.BASE_API_URL + 'classes/comics/'+id;
    parse.initialize();
    $.ajax(url, {'method': "PUT" }).done(function(){
      console.log('removed');
      parse.deinitialize();
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
  baseUrl: 'classes/comics'
});

var ProxyComic = ProxyModel.extend({

});

module.exports = {
  Comic:Comic,
  ComicCollection:ComicCollection,
  Series: Series,
  SeriesCollection:SeriesCollection
};
