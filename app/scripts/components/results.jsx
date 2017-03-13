var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;

class ResultsContainer extends React.Component{
  render(){
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

      </div>
    )
  }
}

module.exports = {ResultsContainer};
