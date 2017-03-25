var $ = require('jquery');
var _ = require('underscore');
var React = require('react');

var User = require('../models/user.js').User;
var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;
var ChangeComic = require('../models/comics.js').ChangeComic;
var ComicCollection = require('../models/comics.js').ComicCollection;
var WishlistComic = require('../models/comics.js').WishlistComic;
var WishlistCollection = require('../models/comics.js').WishlistCollection;
var CollectionContainer = require('./collectionview.jsx').CollectionContainer;

class WishlistContainer extends CollectionContainer{
  constructor(props){
    super(props);

    var user = User.current();
    var userId = user.get('objectId');
    var local = JSON.parse(localStorage.getItem('username'));
    var comicCollection = new WishlistCollection();
    comicCollection.whereClause ={};
    var self = this;
    comicCollection.parseWhere('collectors', '_User', userId).fetch().done(function(){
      console.log(comicCollection);
      self.setState({collection:comicCollection});
    });

    this.state ={
      user:user,
      userId:userId,
      collection:comicCollection
    }
  }
}

module.exports ={WishlistContainer}
