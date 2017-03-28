var $ = require('jquery');
var _ = require('underscore');
var React = require('react');

var User = require('../models/user.js').User;
var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;
var ChangeComic = require('../models/comics.js').ChangeComic;
var FavoriteCollection = require('../models/favorite.js').FavoriteCollection;
var CollectionContainer = require('../components/collectionview.jsx').CollectionContainer;

class FavoriteContainer extends React.Component{
  constructor(props){
    super(props);

    var user = User.current();
    var userId = user.get('objectId');
    var local = JSON.parse(localStorage.getItem('username'));
    var favCollection = new FavoriteCollection();
    favCollection.whereClause ={};
    var self = this;
    favCollection.parseWhere('collectors', '_User', userId).fetch().done(function(){
      console.log(favCollection);
      self.setState({collection:favCollection});
    });

    this.state ={
      user:user,
      userId:userId,
      collection:favCollection
    }
  }
  render(){
    return(
      <LayoutContainer>

      </LayoutContainer>
    )
  }
}


module.exports={FavoriteContainer};
