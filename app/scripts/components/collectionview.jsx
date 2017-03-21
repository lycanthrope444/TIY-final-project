var $ = require('jquery');
var React = require('react');

var User = require('../models/user.js').User;
var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;
var Series = require('../models/comics.js').Series;
var SeriesCollection = require('../models/comics.js').SeriesCollection;

class CollectionContainer extends React.Component{
  constructor(props){
    super(props);

    var user = User.current();
    var userId = user.get('objectId');

    this.state ={
      user:user,
      userId:userId
    }
  }
  render(){
    console.log(this.state);
    return(
      <LayoutContainer>

      </LayoutContainer>
    )
  }
}

module.exports = {CollectionContainer};
