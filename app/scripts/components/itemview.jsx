var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;

class ItemContainer extends React.Component{
  constructor(props){
    super(props);
    //Call Model Here - populate 

    this.state ={

    }
  }
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

class ItemInfo extends React.Component{
  render(){
    return(
      <div>

      </div>
    )
  }
}

class CharacterPhoto extends React.Component{
  render(){
    return(
      <div>

      </div>
    )
  }
}

class QuickLinks extends React.Component{
  render(){
    return(
      <div>

      </div>
    )
  }
}

module.exports = {ItemContainer};
