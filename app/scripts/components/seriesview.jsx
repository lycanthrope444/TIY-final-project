var $ = require('jquery');
var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;
var Series = require('../models/comics.js').Series;
var SeriesCollection = require('../models/comics.js').SeriesCollection;

//Demo Data to structure Components///////////////////////
var seriesDemo1 = {
  id: 465,
  title: 'The Incredible Hulk',
  thumbnail: 'https://unsplash.it/200/300',
  creators:{},
  characters:{},
  comics:{
    available: 119,
    items:[{name:"Hulk Issue 1"}, {name:"Issue 2"},{name:"Issue 3"}]
  },
  events:{}
};

var seriesDemo2 = {
  id: 466,
  title: 'The Incredible Bulk',
  thumbnail: 'https://unsplash.it/200/300',
  creators:{},
  characters:{},
  comics:{
    available: 100,
    items:[{name:"Bulk Issue 1"}, {name:"Issue 2"},{name:"Issue 3"}]
  },
  events:{}
};

var seriesCollDemo = new SeriesCollection();
seriesCollDemo.add(seriesDemo1);
seriesCollDemo.add(seriesDemo2);

//
//End of demo data ///////////////////////


class SeriesContainer extends React.Component{
  constructor(props){
    super(props);
    //This pulls down the user data from parse


    // A comparison of the user data and the series data will need to be made

    this.selectSeries=this.selectSeries.bind(this);
    this.showSeries=this.showSeries.bind(this);

    this.state={
      seriesList:seriesCollDemo,
      selectedSeries: null,
      selectedSeriesIssues: null
    }
  }
  selectSeries(id){
    this.setState({selectedSeries:id});
    $('.seriesList').slideToggle();
    var series = this.state.seriesList.find({'id':id});
    console.log('component', series);
    var issues = series.get('comics');
    this.setState({selectedSeriesIssues: issues})
  }
  showSeries(){
    $('.seriesList').slideToggle();
  }
  addComic(comic){
    //Needs to get information on this comic from Parse
    var comicToAdd = new Comic();
    console.log('add', comic);
    comicToAdd.addToCollection();
  }
  deleteComic(comic){
    console.log('delete', comic);
    var comicToAdd = new Comic();
    comicToAdd.removeFromCollection();
  }
  render(){
    return(
      <LayoutContainer>
        <button className="btn" onClick={this.showSeries}>Show Followed Series</button>
        <SeriesLayout seriesList={this.state.seriesList} selectSeries={this.selectSeries}/>
        <ComicLayout comicList={this.state.selectedSeriesIssues} addComic={this.addComic}
          deleteComic={this.deleteComic}/>
      </LayoutContainer>
    )
  }
}

class SeriesLayout extends React.Component{
  constructor(props){
    super(props);

    this.selectSeries = this.selectSeries.bind(this);
  }
  selectSeries(id){
    this.props.selectSeries(id);
  }
  render(){
    var seriesList = this.props.seriesList.map((item, key)=>{
      return(
        <div className="col-md-4" key={item.get('id')}>
          {item.get('title')}
          <button className="btn" onClick={(e)=>{
              e.preventDefault();
              this.selectSeries(item.get('id'))}}>
            View Collection</button>
          <img src={item.get('thumbnail')} />
        </div>
      )
    });

    return(
      <div className="col-md-12">
        <div className="seriesList">
          {seriesList}
        </div>
      </div>
    )
  }
}

class ComicLayout extends React.Component{
  constructor(props){
    super(props);
  }
  addComic(comic){
    this.props.addComic(comic);
  }
  deleteComic(comic){
    this.props.deleteComic(comic);
  }
  render(){
    console.log(this.props);
    var comicList;
    if (this.props.comicList){
      comicList = this.props.comicList.items.map((item, key)=>{
        return(
          <div key={key}>
            <button className="btn" onClick={(e)=>{
                e.preventDefault();
                this.addComic(item.name);
                }}>
              Add</button>
            <a href="#itemview">
              {item.name}
            </a>
            <button className="btn" onClick={(e)=>{
                e.preventDefault();
                this.deleteComic(item.name);
                }}>
              Delete
            </button>
          </div>
        )
      });
    }

    return(
      <div className="comicList">
        Comic Section
        {comicList}
      </div>
    )
  }
}

module.exports ={SeriesContainer};
