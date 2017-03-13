var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;

class LoginContainer extends React.Component{
  render(){
    return(
      <LayoutContainer>
        <div className="col-md-6">
          <LoginForm />
        </div>
        <div className="col-md-6">
          <SignupForm />
        </div>
      </LayoutContainer>
    )
  }
}

class LoginForm extends React.Component{
  render(){
    return(
      <div>
        
      </div>
    )
  }
}

class SignupForm extends LoginForm{

}

module.exports = {LoginContainer};
