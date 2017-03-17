var React = require('react');

var SearchBar = require('./searchbar.jsx').SearchBar;

class LayoutContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username:this.props.username
    }
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
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            Marvel Logo Placeholder
            <a href="#">Home</a>
          </div>
            <SearchBar />
            <a href="#profile">Profile</a>|
            <a href="#collection">My Collection</a>|
            <a href="#login">Login</a>|
            <a href="#itemview">Item View-Remove Me</a>|
              <a href="#series">Series View-Remove Me</a>|
            Avatar Pic Placeholder
        </div>
      </nav>
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
