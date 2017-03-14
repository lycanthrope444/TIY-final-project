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
        <div className="row">
          Marvel Logo Placeholder
          <a href="#index">Home</a>
          <SearchBar />
          <a href="#profile">Profile</a>|
          <a href="#collection">My Collection</a>|
          <a href="#login">Login</a>|
          <a href="#itemview">Item View-Remove Me</a>|
          Avatar Pic Placeholder
        </div>
      </div>
    )
  }
}

class NavBarFooter extends React.Component{
  render(){
    return(
      <div className="container-fluid">
        <div className="row">
          "Data provided by Marvel. © 2014 Marvel"
        </div>
      </div>
    )
  }
}

module.exports = {LayoutContainer};
