var React = require('react');

var SearchBar = require('./searchbar.jsx').SearchBar;

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
        <SearchBar />
        Nav Bar Header
        <a href="#profile">Profile</a>
        <a href="#collection">My Collection</a>
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
