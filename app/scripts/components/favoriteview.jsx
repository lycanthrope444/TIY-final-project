var $ = require('jquery');
var _ = require('underscore');
var React = require('react');

var User = require('../models/user.js').User;
var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;
var ChangeComic = require('../models/comics.js').ChangeComic;
var FavoriteCollection = require('../models/favorite.js').FavoriteCollection;
var CollectionContainer = require('../components/collectionview.jsx').CollectionContainer;
var CollectionManager = require('../components/collectionview.jsx').CollectionManager;

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
        <DisplayFavorites collection={this.state.collection}/>
      </LayoutContainer>
    )
  }
}

class DisplayFavorites extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    console.log(this.props);
    var favList = this.props.collection.map(function(item, index){
      var searchType ='';
      if(item.get('series')){
        searchType='events';
      } else{
        searchType='series';
      }
      var name = item.get('name');
      if (name){
        searchType='characters';
      }
      var title = item.get('title');
      var id = item.get('id');



      return(
        <div key={item+index} className="col-sm-6">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <a href={"#itemview/" +searchType +"/" + id}>
                <h3 className="panel-title">
                  {name||title}
                </h3>
              </a>
            </div>
          </div>
        </div>
      )
    });
    return(
      <div>
        {favList}
      </div>
    )
  }
}

module.exports={FavoriteContainer};
