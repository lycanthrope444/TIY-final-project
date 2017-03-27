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
    comicCollection.whereClause ={};
    var self = this;
    comicCollection.parseWhere('collectors', '_User', userId).fetch().done(function(){
      console.log(comicCollection);
      self.setState({collection:comicCollection});
    });

    this.state ={
      user:user,
      userId:userId,
      collection:comicCollection
    }
  }
  render(){
    return(
      <LayoutContainer>
        <CollectionManager />
        <DisplayTitles collection={this.state.collection}/>
        <CollectionManager />
      </LayoutContainer>
    )
  }
}

class CollectionManager extends React.Component{
  render(){
    return(
      <div className="row">
        <div className="col-xs-12">
          <button className="btn" onClick={
              (e)=>{
                e.preventDefault();
                $('.comicsList').slideDown(200);
              }
            }>
            Show All
          </button>
          <button className="btn" onClick={
              (e)=>{
                e.preventDefault();
                $('.comicsList').slideUp(200);
              }
            }>
            Hide All
          </button>
        </div>
      </div>
    )
  }
}

class DisplayTitles extends React.Component{
  constructor(props){
    super(props);
  }
  render(){

    var collection = this.props.collection;

    collection.comparator = 'issueNumber';

    var seriesList = collection.groupBy(function(item){
      var series = item.get('series');
      return series.name;
    });

    var comicsIn = _.values(seriesList);
    var titles=_.keys(seriesList).map(function(title, index){

      return(
        <div key={index} className="col-md-6">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h4>{title}
                <button className="btn btn-info"
                  onClick={(e)=>{
                    e.preventDefault();
                    $('.comicsList'+index).slideToggle(200);
                    $('.glyphicon'+index).toggle();
                  }}>
                  <span className=
                    {"glyphicon-down glyphicon glyphicon-menu-down glyphicon"+index}>

                  </span>
                  <span className={"glyphicon-up glyphicon glyphicon-menu-up glyphicon"+index}></span>
                </button>
              </h4>
            </div>
            <div className={"panel-body comicsList comicsList"+index}>
              <ComicsInSeries children={comicsIn[index]}/>
            </div>
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
          <div className="btn-group">
            <button className="btn btn-primary">
              <a href={"#itemview/comics/"+ item.get('id')}
                className="inspect-item">
                <span className="glyphicon glyphicon-zoom-in"></span>
              </a>
            </button>
            <button className="btn btn-default">
              <a href={"#itemview/comics/"+ item.get('id')}>
                {item.get('title')}
              </a>
            </button>
            <button className="btn btn-danger" data-toggle="tooltip"
              data-placement="left" title="Tooltip on left"
              onClick={
                e=>{
                  e.preventDefault();
                  var comic = new ChangeComic(item);
                  comic.removeFromCollection();
                }
              }>
              <span className="glyphicon glyphicon-remove-circle"></span>
            </button>
          </div>
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
