var React = require('react');

var SearchBar = require('./searchbar.jsx').SearchBar;
var User = require('../models/user.js').User;
var AvatarCollection = require('../models/avatar.js').AvatarCollection;

class LayoutContainer extends React.Component{
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);

    var username;
    var userId;
    var user;
    var avatarCollection = new AvatarCollection();
    var self =this;

    if(User.current()){
      username = User.current().get('username');
      userId = User.current().get('objectId');
      user = User.current();
    }


    avatarCollection.whereClause = {};
    avatarCollection.parseWhere('User','_User' , userId).fetch().then(function(){
      var avatar = avatarCollection.models[0];
      var pic;
      if (avatar){
        pic= avatar.get('pic');
        self.setState({pic:pic.url});
      }
    });

    this.state = {
      username:username,
      user:user,
      pic:''
    }
  }
  logout(){
    User.logout();
  }
  render(){
    return(
      <div>
        <NavBarHeader username={this.state.username} logout={this.logout}
          pic={this.state.pic}/>
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
            <img className="marvel-logo" src="https://logorealm.com/wp-content/uploads/2016/07/Marvel-Logo.png"/>
            <a href="#">Home</a>
            <a href="#profile">Profile</a>|
            <a href="#collection">My Collection</a>|
            <a href="#wishlist">Wishlist</a>|
            <a href="#login">Login</a>|
            <a href="#results">Search</a>
            <img className="avatar-header" src={this.props.pic} />
            <button className="btn" onClick={this.props.logout}>Log Out</button>
          </div>
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
