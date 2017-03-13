var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var models = require('../models/models.js');


class ProfileContainer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <LayoutContainer>
        Profile Container Placeholder
      </LayoutContainer>
    )
  }
}

module.exports = {ProfileContainer};
