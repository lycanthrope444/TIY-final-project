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
      <nav className="navbar navbar-inverse navbar-color">
        <div className="container-fluid">
          <div className="navbar-header navbar-color">
            <div className="btn-group">
              <a className="btn btn-interact btn-spacer-rt" href="#">
                <i className="fa fa-home home-nav" aria-hidden="true"></i>
                Home
              </a>

              <a className="btn btn-interact btn-spacer-rt btn-spacer-lft" href="#profile">
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                Profile
              </a>

              <div className="btn-group">
                <button type="button" data-toggle="dropdown"
                  className="btn btn-interact dropdown-toggle btn-spacer-rt btn-spacer-lft"
                   aria-haspopup="true" aria-expanded="false">
                  <span className="caret"></span>
                  Manage

                </button>
                <ul className="dropdown-menu">
                  <li><a href="#collection">Collection</a></li>
                  <li><a href="#wishlist">Wishlist</a></li>
                  <li><a href="#favorites">Favorites</a></li>
                </ul>
              </div>
              <a className="btn btn-interact btn-spacer-rt btn-spacer-lft" href="#results">
                <i className="fa fa-search home-nav" aria-hidden="true"></i>
                Search
              </a>
              <button className="btn btn-interact btn-spacer-lft" onClick={this.props.logout}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                Log Out
              </button>
            </div>
            <img className="avatar-header" src={this.props.pic} />
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
          <div className="footer-control">
            Data provided by
            <a href="https://www.marvel.com">
              <img className="marvel-logo" src="https://logorealm.com/wp-content/uploads/2016/07/Marvel-Logo.png"/>
            </a>
            © 2014 Marvel.
            <div className="legal">
              <a href="#about">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = {LayoutContainer};
