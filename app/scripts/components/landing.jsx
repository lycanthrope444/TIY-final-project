var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;

class LandingContainer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <LayoutContainer>
        <Banner />
        <StarterInfo />
      </LayoutContainer>
    )
  }
}

class Banner extends React.Component{
  render(){
    return(
      <div>
        Banner Place Holder
      </div>
    )
  }
}

class StarterInfo extends React.Component{
  render(){
    return(
      <div>
        Here is some info to get started!
      </div>
    )
  }
}

module.exports = {LandingContainer};
