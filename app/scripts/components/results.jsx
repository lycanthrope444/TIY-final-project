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

    this.state = {
      searchResults:null,
      results: null,
      pages: null
    }
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
        <div>
        </div>
      )
    }
  }
  handleSubmit(searchType, searchTerm){

    var NewSearch = SearchRequest.extend({
      urlRoot: function(){
        var search;
        if (!searchTerm){
          search = '';
        } else {
          search=searchTerm;
        }
        console.log(proxy.PROXY_API_URL+searchType+'?'+search);
        return proxy.PROXY_API_URL+searchType+'?'+search+'&';
      }
    });


    var newSearch = new NewSearch();
    var self = this;

    newSearch.sendSearch(searchType, searchTerm, function(){
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
  render(){
    return(
      <LayoutContainer>
        <div className ="row">
          <SearchBar handleSubmit={this.handleSubmit}/>
        </div>
        <ResultsHeader />
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

      </div>
    )
  }
}

module.exports = {ResultsContainer};
