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
      searchResults:null
    }
  }
  handleResults(){
    if (this.state.searchResults){
      var displayedResults = this.state.searchResults.map(function(item, index){
        return(
          <div key={index}>
            {item.name || item.title}
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
          Display
        </div>
      )
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
      var searchResults = newSearch.get('data')
      self.setState({searchResults:searchResults.results});
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

// Handled under another component

// class ResultsDisplay extends React.Component{
//
//   // <ResultsDisplay searchResults={this.searchResults} />
//
//   // constructor(props){
//   //   super(props);
//   // }
//   // componentWillReceiveProps(){
//   //   console.log('props clicked');
//   // }
//   render(){
//   //   console.log(this.props);
//   //   var displayedResults;
//   //   if (this.props.searchResults){
//   //     var displayedResults = this.props.searchResults.map(function(item, index){
//   //       return(
//   //         <div key={index}>
//   //           {item.title}
//   //         </div>
//   //       )
//   //     });
//   //   }
//
//     //Thumbnail Layour for search Results
//     // <div className="col-sm-6 col-md-4">
//     //   <div className="thumbnail">
//     //     <img src="https://unsplash.it/200/300" />
//     //     <div className="caption">
//     //       <h3>Thumbnail label</h3>
//     //       <p>...</p>
//     //       <p>
//     //         <a className="btn btn-primary" role="button">Button</a>
//     //         <a className="btn btn-default" role="button">Button</a>
//     //       </p>
//     //     </div>
//     //   </div>
//     // </div>
//     return(
//
//       <div>
//         <div className="row">
//
//         </div>
//       </div>
//     )
//   }
// }

module.exports = {ResultsContainer};
