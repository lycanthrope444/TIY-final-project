var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;
var proxy = require('../proxy.js');
var SearchRequest = require('../models/proxy-models.js').SearchRequest;

var demoJSON = require('../demodata');

class ItemContainer extends React.Component{
  constructor(props){
    super(props);
    //The proxy server needs to be contacted here to get the ProxyModel
    var searchType = this.props.searchType;
    var searchId = this.props.id;

    var NewSearch = SearchRequest.extend({
      urlRoot: function(){

        return proxy.PROXY_API_URL+searchType+'/'+searchId+'?';
      }
    });

    var newSearch = new NewSearch();
    var self =this;
    newSearch.sendSearch(function(){
      var searchResults = newSearch.get('data');
      var item = searchResults.results[0];
      self.setState({
        item: item,
        title:item.name||item.title,
        desc: item.description,
        pic: item.thumbnail.path + "."+item.thumbnail.extension
      });
    });

    this.updateCollection=this.updateCollection.bind(this);
    this.updateRating = this.updateRating.bind(this);

    //If the comic is in the collection pull that data here

    //Rating will be pulled from the data on my server, this is dummy data for now

    this.state ={
      item: null,
      title:null,
      desc:null,
      pic:null,
      userRating: 3,
      averageRating: 5
    }
  }
  componentWillMount(){
    console.log(this.state);
  }
  updateCollection(){

    var data = this.state.item;
    var comic = new Comic(data);
    console.log(data);
    console.log(comic);
    comic.addToCollection();
  }
  updateRating(rating){
    var comic = new Comic(this.state.item);
    comic.updateRating(rating);
    console.log(comic, rating);
    this.setState({userRating:rating});
  }
  render(){
    console.log(this.state);
    return(
      <LayoutContainer>
        <div className="col-md-6">
          <ItemInfo desc={this.state.desc} name={this.state.title} />
          <CollectionInfo updateCollection={this.updateCollection} />
          <ItemRating userRating={this.state.userRating}
            updateRating ={this.updateRating} />
        </div>
        <div className="col-md-6">
          <ItemPhoto pic={this.state.pic} />
          <AverageRating averageRating={this.state.averageRating} />
        </div>
        <QuickLinks />
        <DigitalMarketplace />
      </LayoutContainer>
    )
  }
}

class ItemInfo extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <h1>{this.props.name}</h1>
        <p>{this.props.desc}</p>

      </div>
    )
  }
}

class CollectionInfo extends React.Component{
  constructor(props){
    super(props);

    this.updateCollection = this.updateCollection.bind(this);
  }
  updateCollection(e){
    e.preventDefault();
    this.props.updateCollection();
  }
  render(){
    return(
      <div>
        Collection Info Here
        <button className="btn" onClick={this.updateCollection}>
          Add to Collection
        </button>
      </div>
    )
  }
}

class ItemRating extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        Rate this item
        <div className="btn-group">
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {this.props.userRating} <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li><a onClick={()=>{this.props.updateRating(5)}} role="button">5 Stars</a></li>
            <li><a onClick={()=>{this.props.updateRating(4)}} role="button">4 Stars</a></li>
            <li><a onClick={()=>{this.props.updateRating(3)}} role="button">3 Stars</a></li>
            <li><a onClick={()=>{this.props.updateRating(2)}} role="button">2 Stars</a></li>
            <li><a onClick={()=>{this.props.updateRating(1)}} role="button">1 Stars</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

class ItemPhoto extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <img src={this.props.pic}/>
    )
  }
}

class AverageRating extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <h3>The community gives this {this.props.averageRating} stars!</h3>
      </div>
    )
  }
}

class QuickLinks extends React.Component{
  render(){
    return(
      <div className="col-xs-12">
        <h2>You might also enjoy:</h2>
      </div>
    )
  }
}

class DigitalMarketplace extends React.Component{
  render(){
    return(
      <div className="col-xs-12">
        <h2>Find Merch:</h2>
        <a>Local Stores</a>
        <a>Marvel Digital</a>
        <a>Ebay</a>
        <a>Amazon</a>
      </div>
    )
  }
}

module.exports = {ItemContainer};
