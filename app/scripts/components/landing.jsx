var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;

class LandingContainer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <LayoutContainer>
        Landing Container Placeholder
      </LayoutContainer>
    )
  }
}

module.exports = {LandingContainer};
