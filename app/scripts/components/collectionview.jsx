var $ = require('jquery');
var React = require('react');

var User = require('../models/user.js').User;
var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;
var ComicCollection = require('../models/comics.js').ComicCollection;
var Series = require('../models/comics.js').Series;
var SeriesCollection = require('../models/comics.js').SeriesCollection;

class CollectionContainer extends React.Component{
  constructor(props){
    super(props);

    var user = User.current();
    var userId = user.get('objectId');
    var local = JSON.parse(localStorage.getItem('username'));
    var comicCollection = new ComicCollection();
    var self = this;
    comicCollection.parseWhere('collectors', '_User', userId).fetch().done(function(){
      console.log(comicCollection);
      self.setState({collection:comicCollection});
    });

    this.addToCollection=this.addToCollection.bind(this);
    this.deleteFromCollection=this.deleteFromCollection.bind(this);

    this.state ={
      user:user,
      userId:userId,
      collection:comicCollection
    }
  }
  addToCollection(){

  }
  deleteFromCollection(){

  }
  render(){
    console.log(this.state);
    return(
      <LayoutContainer>
        <MyCollection collection={this.state.collection}/>
      </LayoutContainer>
    )
  }
}

class MyCollection extends React.Component{
    constructor(props){
      super(props);

    }
    render(){
      var collection = this.props.collection;
      var displayCollection = collection.map(function(item, index){
        return(
          <div key={index}>
            {item.get('title')}
          </div>
        )
      });

      return(
        <div>
          {displayCollection}
        </div>
      )
    }
}

module.exports = {CollectionContainer};
