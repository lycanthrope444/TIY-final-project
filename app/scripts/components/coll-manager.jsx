var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;

class CollectionContainer extends React.Component{
  constructor(){
    super();
  }
  render(){
    return(
      <LayoutContainer>
        Collection Container
      </LayoutContainer>
    )
  }
}

module.exports ={CollectionContainer};
