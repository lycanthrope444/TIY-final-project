var $ = require('jquery');
var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var LoginContainer = require('./login.jsx').LoginContainer;

class LandingContainer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <LayoutContainer>
        <StarterInfo />
        <LoginButons />
        <LoginContainer />
      </LayoutContainer>
    )
  }
}

class StarterInfo extends React.Component{
  render(){
    return(
      <div>
        <div className="welcome-banner">

          <h1>Welcome to Hero Finder!</h1>
        </div>

        <p>
          Hero Finder lets you search for your favorite Marvel
          characters or series and add those comics to your collection. Rate
          your favorite books and see what the rest of the community thinks!
        </p>
        <p>
          Signing up is easy. Just follow these steps to begin tracking your
          collection right away!
        </p>
        <div className="row">
          <div className="col-sm-4">
            <div className="instruction-box ins-box-1">
              Sign up or login below to make or manage a profile. Feel free to add a profile pic.
            </div>
          </div>
          <div className="col-sm-4">
            <div className="instruction-box ins-box-2">
              Search Marvel's database for your favorite books, heroes or villains.
              Check out the Search F.A.Q. to help you find what you are looking for.
            </div>
          </div>
          <div className="col-sm-4">
            <div className="instruction-box ins-box-3">
              Add comics to your collection or wishlist and track your favorite characters, series and events!
            </div>
          </div>
        </div>

        <p>And that's it! Let us know how you feel about the app! Excelsior! </p>
      </div>
    )
  }
}

class LoginButons extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <div className="login-btns">
          <button className="btn" onClick={
              (e)=>{
                e.preventDefault();
                $('.login-container').slideDown();
                $('.sign-up-container').slideUp();
              }
            }>
            Login
          </button>
          <button className="btn" onClick={
              (e)=>{
                e.preventDefault();
                $('.sign-up-container').slideDown();
                $('.login-container').slideUp();
              }
            }>
            Sign up
          </button>
        </div>
      </div>
    )
  }
}

module.exports = {LandingContainer};
