var React = require('react');
var Backbone = require('backbone');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var User = require('../models/user.js').User;

class LoginContainer extends React.Component{
  constructor(props){
    super(props);

    this.loginUser = this.loginUser.bind(this);

    this.state = {
      username: "username",
      password: "password"
    }
  }
  loginUser(creds){
    User.login(creds, function(user){
      Backbone.history.navigate('profile', {trigger:true});
    });
  }
  createUser(creds){
    var user = new User(creds);
    user.save().then(function(data){
      localStorage.setItem('username', JSON.stringify(data));
      Backbone.history.navigate('profile', {trigger: true});
    });
  }
  render(){
    return(
      <LayoutContainer>
        <div className="col-md-6">
          <LoginForm action={this.loginUser} submitBtn="Login" />
        </div>
        <div className="col-md-6">
          <SignupForm action={this.createUser} submitBtn="Signup"/>
        </div>
      </LayoutContainer>
    )
  }
}

class LoginForm extends React.Component{
  constructor(props){
    super(props);

    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handlePasswordLogin = this.handlePasswordLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    }
  }
  handleUserLogin(e){
    this.setState({username:e.target.value});
  }
  handlePasswordLogin(e){
    this.setState({password:e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state);
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div className ="form-group">
          <label htmlFor ="username-login" >Username</label>
          <input className = "form-control" onChange={this.handleUserLogin}
            id="username-login" placeholder="Username"
          />
        </div>
        <div className ="form-group">
          <label htmlFor ="password-login" >Password</label>
          <input className = "form-control" onChange={this.handlePasswordLogin}
            id="password-login" placeholder="Password" type="password"
          />
        </div>
        <input type="submit" className="btn" value={this.props.submitBtn} />
      </form>
    )
  }
}

class SignupForm extends LoginForm{

}

module.exports = {LoginContainer};
