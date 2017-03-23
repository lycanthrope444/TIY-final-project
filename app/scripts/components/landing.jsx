var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;

class LandingContainer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <LayoutContainer>
        <Banner />
        <StarterInfo />
      </LayoutContainer>
    )
  }
}

class Banner extends React.Component{
  render(){
    return(
      <div>
        Banner Place Holder
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
          Hero Finder is an app that lets you search for your favorite Marvel
          characters or series and add their comics to your collection. Rate
          your favorite books and see what the rest of the community thinks!
        </p>
        <p>
          Signing up is easy. Just follow these steps to begin tracking your
          collection right away!
        </p>
        <ol>
          <li>
            Head over to the
            <a href="#login">Sign up / Login page</a>
            and make a new profile. Feel free to add a profile pic.
          </li>
          <li>
            Search Marvel's database for your favorite books, heros or villains.
            Check out the Search F.A.Q. to help you find what you are looking for.
          </li>
          <li>Add comics to your collection.</li>
        </ol>
        <p>And that's it! Let us know how you feel about the app!</p>
      </div>
    )
  }
}

module.exports = {LandingContainer};
