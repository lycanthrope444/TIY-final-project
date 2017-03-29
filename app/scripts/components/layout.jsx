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
            {this.props.children}
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
            <a href="https://www.marvel.com">
              <img className="marvel-logo" src="https://logorealm.com/wp-content/uploads/2016/07/Marvel-Logo.png"/>
            </a>
            <a href="#">
              <i className="fa fa-home home-nav" aria-hidden="true"></i>
            </a>

            <a href="#profile">Profile</a>|
            <a href="#collection">My Collection</a>|
            <a href="#wishlist">Wishlist</a>|
            <a href="#favorites">Favorites</a>|
            <a href="#results">Search</a>
            <img className="avatar-header" src={this.props.pic} />
            <button className="btn btn-logout" onClick={this.props.logout}>Log Out</button>
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
        Data provided by Marvel. © 2014 Marvel.
        <a href="#about">
          Terms of Use
        </a>
      </div>
    )
  }
}

module.exports = {LayoutContainer};
