var $ = require('jquery');
var _ = require('underscore');
var React = require('react');
var Backbone = require('backbone');

var User = require('../models/user.js').User;
var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;
var ChangeComic = require('../models/comics.js').ChangeComic;
var ComicCollection = require('../models/comics.js').ComicCollection;

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
      collection:comicCollection,
      panelColor:"collection",
      title:"Collection Manager"
    }
  }
  render(){
    return(
      <LayoutContainer>
        <h1 className="manager-title">{this.state.title}</h1>
        <CollectionManager />
        <DisplayTitles collection={this.state.collection}
          panelColor={this.state.panelColor}/>
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
          <div className="coll-btn-spacer btn-group">
            <button className="btn btn-interact btn-spacer-rt" onClick={
                (e)=>{
                  e.preventDefault();
                  $('.comicsList').slideDown(200);
                }
              }>
              Show All
            </button>
            <button className="btn btn-interact btn-spacer-lft" onClick={
                (e)=>{
                  e.preventDefault();
                  $('.comicsList').slideUp(200);
                }
              }>
              Hide All
            </button>
          </div>
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
    var panelColor = this.props.panelColor;
    collection.comparator = 'issueNumber';

    var seriesList = collection.groupBy(function(item){
      var series = item.get('series');
      return series.name;
    });

    var comicsIn = _.values(seriesList);
    var titles=_.keys(seriesList).map(function(title, index){

      return(
        <div key={index} className="col-md-6">
          <div className={"panel panel-" + panelColor }>
            <div className="panel-heading heading">
              <h4 className={"heading-" + panelColor}>
                <button className={"btn btn-" + panelColor}
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
                {title}
              </h4>
            </div>
            <div className={"panel-body comicsList comicsList"+index}>
              <ComicsInSeries children={comicsIn[index]}
                panelColor={panelColor}/>
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
    var panelColor = this.props.panelColor;
    var comics = this.props.children.map(function(item, index){
      return(
        <div key={index}>
          <div className="btn-group">
            <a href={"#itemview/comics/"+ item.get('id')}
              className={"inspect-item btn btn-" + panelColor}>
              <span className="glyphicon glyphicon-zoom-in"></span>
            </a>
            <a href={"#itemview/comics/"+ item.get('id')}
              className="btn btn-default">
              {item.get('title')}
            </a>
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

module.exports = {CollectionContainer,CollectionManager};
