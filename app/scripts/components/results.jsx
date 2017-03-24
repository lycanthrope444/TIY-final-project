var $ = require('jquery');
var React = require('react');
var Backbone = require('react');

var SearchBar = require('./searchbar.jsx').SearchBar;

var SearchRequest = require('../models/proxy-models.js').SearchRequest;
var Results = require('../models/proxy-models.js').Results;
var Comic = require('../models/comics.js').Comic;
var proxy = require('../proxy.js');
var parse = require('../setup').parse;
var LayoutContainer = require('./layout.jsx').LayoutContainer;
var demoJSON = require('../demodata');
var demoSeries = require('../demoseries');

class ResultsContainer extends React.Component{
  constructor(props){
    super(props);

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleResults=this.handleResults.bind(this);
    this.prevOffset=this.prevOffset.bind(this);
    this.nextOffset=this.nextOffset.bind(this);
    this.changeSearchType=this.changeSearchType.bind(this);
    this.changeModType=this.changeModType.bind(this);

    this.state = {
      searchType:'characters',
      searchMod:'name=',
      searchResults:null,
      results: null,
      currentOffset: 0,
      pages: null,
      currPage:1,
      buttonState: 'disabled',
      searchTerm:''
    }
  }
  changeSearchType(term){
    console.log('clicked', term);
    this.setState({searchType:term, currentOffset: 0});
    console.log(this.state);
  }
  changeModType(modObject){
    console.log('clicked', modObject);
    this.setState({searchMod:modObject, currentOffset: 0});
    console.log(this.state);
  }
  handleResults(){
    var self=this;
    if (this.state.searchResults){
      var displayedResults = this.state.searchResults.map(function(item, index){
        return(
          <div key={index}>
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                <img src ={item.thumbnail.path+'.'+item.thumbnail.extension} alt="https://unsplash.it/200/300" />
                <div className="caption">
                  <h3>{item.name || item.title || item.fullName}</h3>
                  <p>{item.description}</p>
                  <p>
                    <a className="btn btn-primary" role="button"
                      href={"#itemview/"+self.state.searchType+'/'+item.id}>
                      View/Rate
                    </a>
                    <a className="btn btn-default" role="button"
                      data-toggle="tooltip" data-placement="left" title="Tooltip on left"
                      onClick={(e)=>{
                        e.preventDefault();
                        var comic = new Comic(item);
                        comic.addToCollection();
                        console.log('clicked');
                      }}>
                      Collect/Follow
                    </a>
                  </p>
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
        <div></div>
      )
    }
  }
  handleSubmit(searchType, searchTerm, searchMod, offset){
    this.setState({searchTerm: searchTerm});
    var currOffset=this.state.currentOffset;
    if (offset){
      currOffset=offset;
    }
    var NewSearch = SearchRequest.extend({
      urlRoot: function(){
        var search;
        var mod;
        if (!searchTerm){
          search = '';
          mod = '';
        } else {
          search=searchTerm;
          mod = searchMod;
        }
        console.log(proxy.PROXY_API_URL+searchType+'?'+mod+search+'&offset='+currOffset+'&');
        return proxy.PROXY_API_URL+searchType+'?'+mod+search+'&offset='+currOffset+'&';
      }
    });

    var newSearch = new NewSearch();

    var self = this;

    newSearch.sendSearch(function(){
      var searchResults = newSearch.get('data')
      console.log(searchResults);
      self.setState({
        searchResults:searchResults.results,
        results: searchResults.total,
        pages: Math.ceil(searchResults.total/20)
      });

      self.handleResults();
    });
  }
  prevOffset(){
    var self = this;
    var newPage = this.state.currPage - 1;
    console.log(newPage);
    var newOffset= this.state.currentOffset - 20;
    this.setState({
      currentOffset: newOffset,
      currPage: newPage
    });
    this.handleSubmit(self.state.searchType, self.state.searchTerm, self.state.searchMod, newOffset);
  }
  nextOffset(){
    var self = this;
    var newPage = this.state.currPage + 1;
    console.log(newPage);
    console.log('next clicked', self.state.searchType, self.state.searchTerm, self.state.searchMod);
    var newOffset= this.state.currentOffset + 20;
    this.setState({
      currentOffset: newOffset,
      currPage: newPage
    });
    console.log(this.state);
    this.handleSubmit(self.state.searchType, self.state.searchTerm, self.state.searchMod, newOffset);
  }
  render(){
    return(
      <LayoutContainer>
        <div className ="row">
          <SearchBar changeSearchType={this.changeSearchType}
            changeModType = {this.changeModType}
            handleSubmit={this.handleSubmit} searchType={this.state.searchType}/>
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
      <div>
        <nav aria-label="...">
          <ul className="pager">
            <li><a href="#top" onClick={this.props.prevOffset}>Previous</a></li>
            <li><a href="#top" onClick={this.props.nextOffset}>Next</a></li>
          </ul>
        </nav>
      </div>
    )
  }
}

module.exports = {ResultsContainer};
