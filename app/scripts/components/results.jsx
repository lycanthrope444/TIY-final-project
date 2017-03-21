var $ = require('jquery');
var React = require('react');

var SearchBar = require('./searchbar.jsx').SearchBar;

var SearchRequest = require('../models/proxy-models.js').SearchRequest;
var Results = require('../models/proxy-models.js').Results;
var Results = require('../models/proxy-models.js').Results;
var proxy = require('../proxy.js');
var parse = require('../setup').parse;
var LayoutContainer = require('./layout.jsx').LayoutContainer;
var apiKey = require('../marvelapi.js').apikey;
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

    this.state = {
      searchType:'characters',
      searchResults:null,
      results: null,
      currentOffset: 0,
      pages: null
    }
  }
  changeSearchType(term){
    console.log('clicked', term);
    this.setState({searchType:term});
    console.log(this.state);
  }
  itemView(){
    return(
      <div>
        Item View
      </div>
    )
  }
  handleResults(){
    if (this.state.searchResults){
      var displayedResults = this.state.searchResults.map(function(item, index){
        return(
          <div key={index}>
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                <img src ={item.thumbnail.path+'.'+item.thumbnail.extension} alt="https://unsplash.it/200/300" />
                <div className="caption">
                  <h3>{item.name || item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <a className="btn btn-primary" role="button">
                      Item View
                    </a>
                    <a className="btn btn-default" role="button">
                      Add to Collection
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
          {displayedResults}
        </div>
      )
    }else{
      return(
        <div></div>
      )
    }
  }
  handleSubmit(searchType, searchTerm, offset){
    var currOffset=this.state.currentOffset;
    if (offset){
      currOffset=offset;
    }
    var NewSearch = SearchRequest.extend({
      urlRoot: function(){
        var search;
        if (!searchTerm){
          search = '';
        } else {
          search=searchTerm;
        }
        console.log(proxy.PROXY_API_URL+searchType+'?'+search+'&offset='+currOffset+'&');
        return proxy.PROXY_API_URL+searchType+'?'+search+'&offset='+currOffset+'&';
      }
    });

    var newSearch = new NewSearch();
    var self = this;

    newSearch.sendSearch(function(){
      console.log(newSearch);
      var searchResults = newSearch.get('data')
      self.setState({
        searchResults:searchResults.results,
        results: searchResults.total,
        pages: Math.ceil(searchResults.total/20)
      });
      console.log(self.state);
      self.handleResults();
    });
  }
  prevOffset(){
    console.log('prev clicked');
  }
  nextOffset(){
    console.log('next clicked');
  }
  render(){
    return(
      <LayoutContainer>
        <div className ="row">
          <SearchBar changeSearchType={this.changeSearchType}
            handleSubmit={this.handleSubmit}/>
        </div>
        <ResultsHeader prevOffset={this.prevOffset}
          nextOffset={this.nextOffset}/>
        {this.itemView()}
        {this.handleResults()}
      </LayoutContainer>
    )
  }
}

class ResultsHeader extends React.Component{
  render(){
    return(
      <div>
        <nav aria-label="...">
          <ul className="pager">
            <li><a onClick={this.props.prevOffset}>Previous</a></li>
            <li><a onClick={this.props.nextOffset}>Next</a></li>
          </ul>
        </nav>
      </div>
    )
  }
}

module.exports = {ResultsContainer};
