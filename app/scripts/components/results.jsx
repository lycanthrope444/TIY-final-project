var $ = require('jquery');
var React = require('react');
var Backbone = require('react');

var SearchBar = require('./searchbar.jsx').SearchBar;

var SearchRequest = require('../models/proxy-models.js').SearchRequest;
var Results = require('../models/proxy-models.js').Results;
var Comic = require('../models/comics.js').Comic;
var WishlistComic = require('../models/comics.js').WishlistComic;
var proxy = require('../proxy.js');
var parse = require('../setup').parse;
var LayoutContainer = require('./layout.jsx').LayoutContainer;
var FavoriteModel = require('../models/favorite.js').FavoriteModel;

class ResultsContainer extends React.Component{
  constructor(props){
    super(props);

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleResults=this.handleResults.bind(this);
    this.prevOffset=this.prevOffset.bind(this);
    this.nextOffset=this.nextOffset.bind(this);
    this.changeSearchType=this.changeSearchType.bind(this);
    this.changeModType=this.changeModType.bind(this);

    console.log('props constructor',this.props);

    this.state = {
      searchType:'characters',
      searchMod:'name=',
      searchResults:null,
      results: null,
      currentOffset: 0,
      pages: null,
      currPage:1,
      buttonState: 'disabled',
      searchTerm:'',
      id:null,
      focus:''
    }
  }
  componentWillMount(){
    var initialSearch = new SearchRequest();
    var self = this;
    if(self.props.id){
      self.setState({
        searchType:self.props.searchType,
        id: self.props.id,
        focus: self.props.focus
      });
      $(document.body).css({'cursor' : 'wait'});
      initialSearch.singleUrl(self.props.searchType, self.props.id, self.props.focus);
      initialSearch.sendSearch(function(){
        console.log('searching');
        var filter = initialSearch.get('data');
        console.log(filter);
        self.setState({
          searchResults:filter.results,
          searchType:self.props.focus
        });
        $(document.body).css({'cursor' : 'default'});
      });
    }
  }
  changeSearchType(term){
    console.log('clicked', term);
    this.setState({
      searchType:term,
      currentOffset: 0,
      focus:''
    });
    console.log(this.state);
  }
  changeModType(modObject){
    console.log('clicked', modObject);
    this.setState({searchMod:modObject, currentOffset: 0});
    console.log(this.state);
  }
  handleResults(){
    var self=this;
    if (this.state.searchResults&&this.state.searchResults.length>=1){
      var displayedResults = this.state.searchResults.map(function(item, index){
        return(
          <div key={index}>
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail results-panel">
                <img className="results-pic"
                  src ={item.thumbnail.path+'.'+item.thumbnail.extension} />
                <div className="caption results-caption">
                  <h3 className="results-title">{item.name || item.title}</h3>
                  <FeatureButtons item={item} searchType={self.state.searchType}
                    focus={self.state.focus} id={self.state.id}/>
                </div>
              </div>
            </div>
          </div>
        )
      });
      return(
        <div>
          <ResultsHeader currPage={this.state.currPage} prevOffset={this.prevOffset}
            nextOffset={this.nextOffset}/>
          {displayedResults}
          <ResultsHeader currPage={this.state.currPage} prevOffset={this.prevOffset}
            nextOffset={this.nextOffset}/>
        </div>
      )
    }else{
      return(
        <div className="results-spacer">

        </div>
      )
    }
  }
  handleSubmit(searchType, searchTerm, searchMod, offset){
    console.log(searchType, searchTerm, searchMod, offset);

    $(document.body).css({'cursor' : 'wait'});

    this.setState({
      searchTerm: searchTerm,
      focus:''
    });
    var currOffset=this.state.currentOffset;
    if (offset){
      currOffset=offset;
    }

    var newSearch = new SearchRequest();
    newSearch.modifyUrl(searchType, searchTerm, searchMod, offset);

    var self = this;

    newSearch.sendSearch(function(){
      var searchResults = newSearch.get('data')
      console.log(searchResults);
      self.setState({
        searchResults:searchResults.results,
        results: searchResults.total,
        pages: Math.ceil(searchResults.total/20)
      });
      $(document.body).css({'cursor' : 'default'});
      self.handleResults();
    });

  }
  prevOffset(){
    var self = this;
    var newPage = this.state.currPage - 1;
    var newOffset= this.state.currentOffset - 20;
    var initialSearch = new SearchRequest();

    if(self.props.id){

      var searchType = self.props.searchType ;
      var id = self.props.id;
      var focus = self.props.focus;

      initialSearch.singleUrl(searchType, id, focus, newOffset);
      initialSearch.sendSearch(function(){
        console.log('searching');
        var filter = initialSearch.get('data');
        console.log(filter);
        self.setState({
          searchResults:filter.results,
          currentOffset:newOffset
        });
      });
    } else {
      console.log(newPage);
      console.log('prev clicked', self.state.searchType, self.state.searchTerm, self.state.searchMod);

      this.setState({
        currentOffset: newOffset,
        currPage: newPage
      });
      console.log(this.state);
      this.handleSubmit(self.state.searchType, self.state.searchTerm, self.state.searchMod, newOffset);
    }
  }
  nextOffset(){
    var self = this;
    var newPage = this.state.currPage + 1;
    var newOffset= this.state.currentOffset + 20;
    var initialSearch = new SearchRequest();

    if(self.props.id){

      var searchType = self.props.searchType ;
      var id = self.props.id;
      var focus = self.props.focus;

      initialSearch.singleUrl(searchType, id, focus, newOffset);
      initialSearch.sendSearch(function(){
        console.log('searching');
        var filter = initialSearch.get('data');
        console.log(filter);
        self.setState({
          searchResults:filter.results,
          currentOffset:newOffset
        });
      });
    } else {
      console.log(newPage);
      console.log('next clicked', self.state.searchType, self.state.searchTerm, self.state.searchMod);

      this.setState({
        currentOffset: newOffset,
        currPage: newPage
      });
      console.log(this.state);
      this.handleSubmit(self.state.searchType, self.state.searchTerm, self.state.searchMod, newOffset);
    }
  }
  render(){
    console.log('state', this.state);
    return(
      <LayoutContainer>
        <div className ="row">
          <div>
            <SearchBar changeSearchType={this.changeSearchType}
              changeModType = {this.changeModType}
              handleSubmit={this.handleSubmit} searchType={this.state.searchType}/>
          </div>
        </div>
        {this.handleResults()}

      </LayoutContainer>
    )
  }
}

class ResultsHeader extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="row">
        <div className="col-xs-12">
          <nav aria-label="...">
            <ul className="pager">
              <li><a onClick={(e)=>{
                  e.preventDefault();
                  this.props.prevOffset();
                }}>
                Previous</a></li>
              <li><a onClick={(e)=>{
                  e.preventDefault();
                  this.props.nextOffset();
                }}>
                Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

class FeatureButtons extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var self = this;
    if (this.props.searchType === 'comics'){
      return(
        <div className="results-buttons btn-group">
          <ViewButton focus={self.props.focus} id={self.props.item.id}
            searchType={self.props.searchType}/>
          <AddToCollectionBtn name="Collection" item={self.props.item}/>
          <AddToWishlistBtn name="Wishlist" item={self.props.item}/>
        </div>
      )
    } else {
      return (
        <div className="results-buttons btn-group">
          <ViewButton focus={self.props.focus} id={self.props.item.id}
            searchType={self.props.searchType}/>
          <FavoriteBtn name="Favorite" item={self.props.item}/>
        </div>
      )
    }
  }
}

class ViewButton extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var self = this;
    return(
      <a className="btn btn-interact btn-spacer-rt" role="button"
        href={((self.props.focus)?"#itemview/"+self.props.focus+'/'+self.props.id :
          "#itemview/"+self.props.searchType+'/'+self.props.id)}>
        <span className="glyphicon glyphicon-zoom-in"></span>
        View
      </a>
    )
  }
}

class AddToCollectionBtn extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <a className="btn btn-collection btn-spacer-rt btn-spacer-lft" role="button"
        data-toggle="tooltip" data-placement="left" title="Add to Collection"
        onClick={(e)=>{
          e.preventDefault();
          var comic = new Comic(this.props.item);
          comic.addToCollection();
          console.log('clicked');
        }}>
        <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        {this.props.name}
      </a>
    )
  }
}

class AddToWishlistBtn extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <a className="btn btn-wishlist btn-spacer-lft" role="button"
        data-toggle="tooltip" data-placement="left" title="Tooltip on left"
        onClick={(e)=>{
          e.preventDefault();
          var comic = new WishlistComic(this.props.item);
          comic.addToWishlist();
          console.log('clicked');
        }}>
        <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        {this.props.name}
      </a>
    )
  }
}

class FavoriteBtn extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var self = this;
    return(
      <a className="btn btn-favorite btn-spacer-lft" role="button"
        data-toggle="tooltip" data-placement="left" title="Tooltip on left"
        onClick={(e)=>{
          e.preventDefault();
          var fav = new FavoriteModel(this.props.item);
          console.log('clicked');
          fav.addToFavorite();
        }}>
        <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
        {this.props.name}
      </a>
    )
  }
}

module.exports = {ResultsContainer};
