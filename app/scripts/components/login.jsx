var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var User = require('../models/user').User;

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
    console.log('button clicked', this.state.user, this.state.password);
    User.login(creds, function(user){
      // Backbone.history.navigate(, {trigger:true});
    });
  }
  createUser(creds){
    var user = new User(creds);
    user.save().then(function(data){
      localStorage.setItem('user', JSON.stringify(data));
      // Backbone.history.navigate( , {trigger: true});
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
      username: "username",
      password: "password"
    }
  }
  handleUserLogin(e){
    this.setState({user:e.target.value});
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
      <form>
        <div className ="form-group">
          <label htmlFor ="username-login" >username</label>
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
