var _ = require('underscore');
var React = require('react');

var User = require('../models/user.js').User;
var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;
var ComicRating = require('../models/comics.js').ComicRating;
var RatingCollection = require('../models/comics.js').RatingCollection;
var WishlistComic = require('../models/comics.js').WishlistComic;
var proxy = require('../proxy.js');
var SearchRequest = require('../models/proxy-models.js').SearchRequest;

class ItemContainer extends React.Component{
  constructor(props){
    super(props);
    var searchType = this.props.searchType;
    var searchId = this.props.id;

    this.updateCollection=this.updateCollection.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.updateWishlist = this.updateWishlist.bind(this);
    this.averageRating = this.averageRating.bind(this);

    var ratingsColl = new RatingCollection();
    var numberId = parseInt(searchId);

    var newSearch = new SearchRequest();
    newSearch.singleUrl(searchType, searchId);
    var self =this;
    newSearch.sendSearch(function(){
      var searchResults = newSearch.get('data');
      var item = searchResults.results[0];
      self.setState({
        item: item,
        title:item.name||item.title,
        desc: item.description,
        pic: item.thumbnail.path + "."+item.thumbnail.extension
      });

      ratingsColl.parseWhere('comicId', numberId).fetch().done(function(){
        console.log('ratings',ratingsColl);
        var counter = 0;
        var tally = 0;
        ratingsColl.forEach(function(item){
          counter += 1;
          tally += item.get('rating');
        });
        self.setState({
          averageRating: (tally/counter).toFixed(2)
        })
      });

    });

    var averageRating = this.averageRating();

    this.state ={
      item: null,
      title:null,
      desc:null,
      pic:null,
      userRating: 3,
      averageRating: 5,
      searchType: searchType,
      searchId: searchId
    }
  }
  updateCollection(){
    var data = this.state.item;
    var comic = new Comic(data);
    comic.addToCollection();
  }
  updateWishlist(){
    var data = this.state.item;
    var comic = new WishlistComic(data);
    comic.addToWishlist();
  }
  updateRating(rating){
    var comicRating ={
      comicId: this.state.item.id,
      title: this.state.item.title,
      rating: rating
    };

    var userId = User.current().get('objectId');

    var comic = new ComicRating(comicRating);

    comic.setPointer('User', '_User', userId);
    console.log('comic',comic);
    comic.updateRating(rating);
    this.setState({userRating:rating});
    this.averageRating();
  }
  averageRating(){

  }
  render(){
    console.log(this.state);
    return(
      <LayoutContainer>
        <div className="col-md-6">
          <ItemInfo desc={this.state.desc} name={this.state.title} />
          <CollectionInfo updateCollection={this.updateCollection}
            updateWishlist={this.updateWishlist}/>
          <ItemRating userRating={this.state.userRating}
            updateRating ={this.updateRating} />
          <AverageRating averageRating={this.state.averageRating} />
          <QuickLinks searchType={this.state.searchType}
            searchId={this.state.searchId} />
          <DigitalMarketplace />
        </div>
        <div className="col-md-6">
          <ItemPhoto pic={this.state.pic} />
        </div>


      </LayoutContainer>
    )
  }
}

class ItemInfo extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <h1>{this.props.name}</h1>
        <p>{this.props.desc}</p>

      </div>
    )
  }
}

class CollectionInfo extends React.Component{
  constructor(props){
    super(props);

    this.updateCollection = this.updateCollection.bind(this);
  }
  updateCollection(e){
    e.preventDefault();
    this.props.updateCollection();
  }
  render(){
    return(
      <div>
        <button className="btn btn-primary" onClick={this.updateCollection}>
          <span className="glyphicon glyphicon-plus-sign"></span>
            Collection
        </button>
        <button className="btn btn-info" onClick={this.props.updateWishlist}>
          <span className="glyphicon glyphicon-plus-sign"></span>
            Wishlist
        </button>
      </div>
    )
  }
}

class ItemRating extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        Rate this item
        <div className="btn-group">
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {this.props.userRating} <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li><a onClick={()=>{this.props.updateRating(5)}} role="button">5 Stars</a></li>
            <li><a onClick={()=>{this.props.updateRating(4)}} role="button">4 Stars</a></li>
            <li><a onClick={()=>{this.props.updateRating(3)}} role="button">3 Stars</a></li>
            <li><a onClick={()=>{this.props.updateRating(2)}} role="button">2 Stars</a></li>
            <li><a onClick={()=>{this.props.updateRating(1)}} role="button">1 Stars</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

class ItemPhoto extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <img src={this.props.pic}/>
    )
  }
}

class AverageRating extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <h3>The community gives this {this.props.averageRating} stars!</h3>
      </div>
    )
  }
}

class QuickLinks extends React.Component{
  constructor(props){
    super(props);

    var searchType = this.props.searchType;
    var searchId = this.props.searchId;

    var comp = ['characters', 'events', 'comics', 'series'];

    var linkList = _.reject(comp, function(item, index){
      return searchType === item;
    });

    this.state={
      searchType:searchType,
      searchId:searchId,
      linkList:linkList
    }
  }
  render(){
    console.log('links', this.state);
    var self =this;
    var links = this.state.linkList.map(function(item, index){
      return(
        <div key={"link"+index}>
          <a href={"#results/"+self.state.searchType+"/"+self.state.searchId+"/"+item}>
            {item}
          </a>
        </div>
      )
    });

    return(
      <div>
        {links}
      </div>
    )
  }
}

class DigitalMarketplace extends React.Component{
  render(){
    return(
      <div>
        <h2>Find Online:</h2>
        <a href="http://www.comicshoplocator.com/">Local Stores</a>
        <a href="https://comicstore.marvel.com/">Marvel Digital</a>
        <a href="http://www.ebay.com/">Ebay</a>
        <a href="https://www.amazon.com/"><i className="fa fa-amazon" aria-hidden="true"></i></a>
      </div>
    )
  }
}

module.exports = {ItemContainer};
