var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;

class ItemContainer extends React.Component{
  render(){
    return(
      <LayoutContainer>
        <ItemInfo />
        <CharacterPhoto />
        <QuickLinks />
      </LayoutContainer>
    )
  }
}
