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

    this.state = {

    }
  }
  handleSubmit(searchType, searchTerm){

    var NewSearch = SearchRequest.extend({
      urlRoot: function(){
        console.log(proxy.PROXY_API_URL+searchType);
        return proxy.PROXY_API_URL+searchType
      }
    });


    var newSearch = new NewSearch();
    var self = this;

    newSearch.sendSearch(searchType, searchTerm, function(){
      console.log(newSearch);
      self.setState({searchResults:newSearch.get('data')});
      console.log(self.state.searchResults.results);
    });



  }
  render(){
    return(
      <LayoutContainer>
        <div className ="row">
          <SearchBar handleSubmit={this.handleSubmit}/>
        </div>
        <ResultsHeader />
        <ResultsDisplay />
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

class ResultsDisplay extends React.Component{
  render(){


    //Thumbnail Layour for search Results
    // <div className="col-sm-6 col-md-4">
    //   <div className="thumbnail">
    //     <img src="https://unsplash.it/200/300" />
    //     <div className="caption">
    //       <h3>Thumbnail label</h3>
    //       <p>...</p>
    //       <p>
    //         <a className="btn btn-primary" role="button">Button</a>
    //         <a className="btn btn-default" role="button">Button</a>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    return(
      <div>
        <div className="row">

        </div>
      </div>
    )
  }
}

module.exports = {ResultsContainer};
