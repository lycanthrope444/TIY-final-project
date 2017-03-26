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
  urlRoot:function(){
    var url = parse.BASE_API_URL + 'classes/comics/';
    console.log(url);
    return url;
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
  }
});

var ComicRating = ParseModel.extend({
  urlRoot:function(){
    var url = parse.BASE_API_URL + 'classes/ratings/';
    return url;
  },
  updateRating: function(){
    console.log('rating 1', this);
    this.save().then(function(){
      console.log('rating 2');
    });
  },
  getRating:function(){

  }
});

var WishlistComic = ParseModel.extend({
  urlRoot:function(){
    var url = parse.BASE_API_URL + 'classes/wishlist/';
    console.log(url);
    return url;
  },
  addToWishlist: function(){
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
  }
});

var ChangeComic = ParseModel.extend({
  urlRoot:function(){
    var objectId = this.get('id');

    var url = parse.BASE_API_URL + 'classes/comics/'+objectId;
    console.log(url);
    return url;
  },
  removeFromCollection: function(){
    //Used to remove from the User's Collection
    var userId = User.current().get('objectId');
    console.log(userId);
    console.log('1', this);
    this.set({'collectors' : {
      "__op":"RemoveRelation",
      "objects":[{
        "__type":"Pointer",
        "className":"_User",
        "objectId":userId
      }]
    }});
    console.log('2', this);
    var objectId = this.get('id');

    var url = parse.BASE_API_URL + 'classes/comics/'+objectId;

    parse.initialize();
    $.ajaxSetup({
      'method':"PUT"
    });

    var thisComic = this;
    console.log(thisComic);
    console.log(url);
    $.ajax({
      url:url,
      thisComic:thisComic
    }).done(function(){
      console.log('removed');
    });

    parse.deinitialize();
  }
});

var ComicCollection = ParseCollection.extend({
  model: Comic,
  baseUrl: 'classes/comics'
});

var WishlistCollection = ParseCollection.extend({
  model: Comic,
  baseUrl: 'classes/wishlist'
});

var ProxyComic = ProxyModel.extend({

});

module.exports = {
  Comic:Comic,
  ComicCollection:ComicCollection,
  ComicRating:ComicRating,
  ChangeComic:ChangeComic,
  WishlistCollection:WishlistCollection,
  WishlistComic:WishlistComic
};
