var $ = require('jquery');
var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;
var Series = require('../models/comics.js').Series;
var SeriesCollection = require('../models/comics.js').SeriesCollection;

class CollectionContainer extends React.Component{
  constructor(props){
    super(props);

    this.state ={
      
    }
  }
  render(){
    return(
      <LayoutContainer>

      </LayoutContainer>
    )
  }
}

module.exports = {CollectionContainer};
