var $ = require('jquery');
var React = require('react');

var parse = require('../setup').parse;
var LayoutContainer = require('./layout.jsx').LayoutContainer;
var apiKey = require('../marvelapi.js').apikey;
var demoJSON = require('../demodata');
var demoSeries = require('../demoseries');

class ResultsContainer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    // console.log(demoJSON);
    return(
      <LayoutContainer>
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
    return(
      <div>
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src="https://unsplash.it/200/300" />
              <div className="caption">
                <h3>Thumbnail label</h3>
                <p>...</p>
                <p>
                  <a className="btn btn-primary" role="button">Button</a>
                  <a className="btn btn-default" role="button">Button</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = {ResultsContainer};
