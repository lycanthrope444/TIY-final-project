var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;
var Series = require('../models/comics.js').Series;
var SeriesCollection = require('../models/comics.js').SeriesCollection;

//Demo Data to structure Components///////////////////////
var seriesDemo1 = {
  title: 'The Incredible Hulk',
  thumbnail: 'https://unsplash.it/200/300',
  creators:{},
  characters:{},
  comics:{
    available: 119
  },
  events:{}
};

var seriesDemo2 = {
  title: 'The Incredible Bulk',
  thumbnail: 'https://unsplash.it/200/300',
  creators:{},
  characters:{},
  comics:{
    available: 100
  },
  events:{}
};

var seriesCollDemo = new SeriesCollection();
seriesCollDemo.add(seriesDemo1);
seriesCollDemo.add(seriesDemo2);

var demoData = {
  title: 'The Incredible Hulk #181',
  issueNumber: 181,
  description: 'Hulk fights Wolverine',
  pic: 'https://unsplash.it/200/300',
  creators: [],
  characters:[],
  collectible: true
};
//
//End of demo data ///////////////////////


class CollectionContainer extends React.Component{
  constructor(props){
    super(props);
    //This pulls down the user data from parse


    // A comparison of the user data and the series data will need to be made

    this.state={
      seriesList:seriesCollDemo,
      selectedSeries: null,
      selectedComic: null
    }
  }
  selectSeries(){

  }
  selectComic(){

  }
  render(){
    console.log(seriesCollDemo);
    return(
      <LayoutContainer>
        Collection Container
        <SeriesLayout seriesList={this.state.seriesList}/>
        <ComicLayout />
      </LayoutContainer>
    )
  }
}

class SeriesLayout extends React.Component{
  constructor(props){
    super(props);

    this.selectSeries = this.selectSeries.bind(this);
  }
  selectSeries(){

  }
  render(){
    var seriesList = this.props.seriesList.map(function(item, key){
      return(
        <div className="col-md-4" key={key}>
          {item.get('title')}
          <img src={item.get('thumbnail')} />
        </div>
      )
    });

    return(
      <div>
        {seriesList}
      </div>
    )
  }
}

class ComicLayout extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        Comic Section
      </div>
    )
  }
}

module.exports ={CollectionContainer};
