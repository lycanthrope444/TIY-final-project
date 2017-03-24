var $ = require('jquery');
var _ = require('underscore');
var React = require('react');

var User = require('../models/user.js').User;
var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;
var ChangeComic = require('../models/comics.js').ChangeComic;
var ComicCollection = require('../models/comics.js').ComicCollection;
var Series = require('../models/comics.js').Series;
var SeriesCollection = require('../models/comics.js').SeriesCollection;

class CollectionContainer extends React.Component{
  constructor(props){
    super(props);

    var user = User.current();
    var userId = user.get('objectId');
    var local = JSON.parse(localStorage.getItem('username'));
    var comicCollection = new ComicCollection();
    var self = this;
    comicCollection.parseWhere('collectors', '_User', userId).fetch().done(function(){
      console.log(comicCollection);
      self.setState({collection:comicCollection});
    });

    this.addToCollection=this.addToCollection.bind(this);
    this.deleteFromCollection=this.deleteFromCollection.bind(this);

    this.state ={
      user:user,
      userId:userId,
      collection:comicCollection
    }
  }
  addToCollection(){

  }
  deleteFromCollection(){

  }
  render(){
    return(
      <LayoutContainer>
        <DisplayTitles collection={this.state.collection}/>
      </LayoutContainer>
    )
  }
}

class DisplayTitles extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props);
    var collection = this.props.collection;
    console.log('coll',collection);

    var seriesList = collection.groupBy(function(item){
      var series = item.get('series');
      return series.name;
    });


    console.log(_.values(seriesList));
    var comicsIn = _.values(seriesList);
    var titles=_.keys(seriesList).map(function(title, index){

      return(
        <div key={index}>
          <h4>{title}</h4>
          <button className="btn"
            onClick={(e)=>{
              e.preventDefault();
              $('.comicsList'+index).slideToggle(200);
            }}>
            Show/Hide
          </button>
          <div className={"comicsList"+index}>
            <ComicsInSeries children={comicsIn[index]}/>
          </div>
        </div>
      )
    });
    return(
      <div>
        {titles}
      </div>
    )
  }
}

class ComicsInSeries extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var comics = this.props.children.map(function(item, index){
      return(
        <div key={index}>
          <a href={"#itemview/comics/"+ item.get('id')}>
            {item.get('title')}
          </a>
          <button className="btn btn-danger" data-toggle="tooltip"
            data-placement="left" title="Tooltip on left"
            onClick={
              e=>{
                e.preventDefault();
                var comic = new ChangeComic(item);
                console.log('clicked', comic);
                comic.removeFromCollection();
              }
            }>
            X
          </button>
        </div>
      )
    });
    return(
      <div>
        {comics}
      </div>
    )
  }
}

module.exports = {CollectionContainer};
