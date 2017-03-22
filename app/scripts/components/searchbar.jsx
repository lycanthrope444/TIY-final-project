var Backbone = require('backbone');
var React = require('react');

var SearchRequest = require('../models/proxy-models.js').SearchRequest;
var Results = require('../models/proxy-models.js').Results;
var Results = require('../models/proxy-models.js').Results;
var proxy = require('../proxy.js');

class SearchBar extends React.Component{
  constructor(props){
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeSearchType = this.changeSearchType.bind(this);
    this.changeModType = this.changeModType.bind(this);

    this.state ={
      searchType:'characters',
      searchTerm:'',
      searchMod:{
        title:'Exact Name',
        action: 'name='
      }
    }
  }
  changeSearchType(term){

    this.props.changeSearchType(term);
    this.setState({searchType:term});
  }
  changeModType(termObject){

    this.props.changeModType(termObject.action);
    this.setState({searchMod:termObject});
  }
  handleSearch(e){
    this.setState({ searchTerm : e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();

    var searchTerm = this.state.searchTerm;
    var searchType = this.state.searchType;
    var searchMod = this.state.searchMod.action;

    this.props.handleSubmit(searchType, searchTerm, searchMod);
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="navbar-form navbar-left">
            <SearchButton searchType={this.state.searchType} changeSearchType={this.changeSearchType} />
            <FlexButton searchMod={this.state.searchMod} changeModType={this.changeModType} />
            <input className="form-control" placeholder="Search" onChange={this.handleSearch} />
            <input type="submit" className ="btn" value="Search" />
          </div>
        </form>
      </div>
    )
  }
}

class SearchButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="btn-group">
        <button type="button" className="btn btn-default dropdown-toggle"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.props.searchType} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a onClick={()=>{this.props.changeSearchType('characters')}} role="button">Character</a></li>
          <li><a onClick={()=>{this.props.changeSearchType('comics')}} role="button">Comics</a></li>
          <li><a onClick={()=>{this.props.changeSearchType('events')}} role="button">Events</a></li>
          <li><a onClick={()=>{this.props.changeSearchType('series')}} role="button">Series</a></li>
        </ul>
      </div>
    )
  }
}

class FlexButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="btn-group">
        <button type="button" className="btn btn-default dropdown-toggle"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.props.searchMod.title} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a onClick={()=>{this.props.changeModType({
            title:'Exact Name',
            action: 'name='
          })}} role="button">Exact Name</a></li>
          <li><a onClick={()=>{this.props.changeModType({
            title:'Starts With',
            action: 'nameStartsWith='
          })}} role="button">Starts With</a></li>
        </ul>
      </div>
    )
  }
}
module.exports = {SearchBar};
