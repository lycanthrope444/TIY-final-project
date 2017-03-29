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

class Banner extends React.Component{
  render(){
    return(
      <div id="landing-carousel" className="carousel slide" data-ride="carousel">

        <ol className="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>

        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <img src="http://www.alexrossart.com/assets/images/Spider%20Man%20Marvels%20copy.jpg" alt="..." />
            <div className="carousel-caption">
              One
            </div>
          </div>
          <div className="item">
            <img src="https://s-media-cache-ak0.pinimg.com/originals/c1/17/b7/c117b726b2f68c4755941994d1d39788.jpg" alt="..." />
            <div className="carousel-caption">
              Two
            </div>
          </div>
          ...
        </div>

        <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    )
  }
}

class StarterInfo extends React.Component{
  render(){
    return(
      <div>
        <h1>Welcome to Hero Finder!</h1>
        <p>
          Hero Finder lets you search for your favorite Marvel
          characters or series and add those comics to your collection. Rate
          your favorite books and see what the rest of the community thinks!
        </p>
        <p>
          Signing up is easy. Just follow these steps to begin tracking your
          collection right away!
        </p>
        <ol>
          <li>
            Sign up or login below to make or manage a profile. Feel free to add a profile pic.
          </li>
          <li>
            Search Marvel's database for your favorite books, heroes or villains.
            Check out the Search F.A.Q. to help you find what you are looking for.
          </li>
          <li>Add comics to your collection or wishlist and track your favorite characters, series and events!</li>
        </ol>
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
                $('.sign-up-container').slideDown();
                $('.login-container').slideUp();
              }
            }>
            Login
          </button>
          <button className="btn" onClick={
              (e)=>{
                e.preventDefault();
                $('.login-container').slideDown();
                $('.sign-up-container').slideUp();
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
