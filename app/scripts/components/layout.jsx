var React = require('react');

class LayoutContainer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <NavBarHeader />
        {this.props.children}
        <NavBarFooter />
      </div>
    )
  }
}

class NavBarHeader extends React.Component{
  render(){
    return(
      <div>
        <a href="#index">Home</a>
        Nav Bar Header
        <a href="#profile">Profile</a>
        <a href="#login">Login</a>
      </div>
    )
  }
}

class NavBarFooter extends React.Component{
  render(){
    return(
      <div>
        Nav Bar Footer
      </div>
    )
  }
}

module.exports = {LayoutContainer};
