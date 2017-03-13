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
          <div className="container">
            <div className="row">
              {this.props.children}
            </div>
          </div>
        <NavBarFooter />
      </div>
    )
  }
}

class NavBarHeader extends React.Component{
  render(){
    return(
      <div className="container-fluid">
        Marvel Logo Placeholder
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
      <div className="container-fluid">
        Nav Bar Footer
        "Data provided by Marvel. © 2014 Marvel"
      </div>
    )
  }
}

module.exports = {LayoutContainer};
