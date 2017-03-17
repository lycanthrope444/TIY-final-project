var React = require('react');

var SearchBar = require('./searchbar.jsx').SearchBar;
var User = require('../models/user.js').User;

class LayoutContainer extends React.Component{
  constructor(props){
    super(props);

    this.logout = this.logout.bind(this);

    this.state = {
      username:this.props.username
    }
  }
  logout(){
    User.logout();
  }
  render(){
    return(
      <div>
        <NavBarHeader logout={this.logout}/>
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
  constructor(props){
    super(props);
  }
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
            <button className="btn" onClick={this.props.logout}>Log Out</button>
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
