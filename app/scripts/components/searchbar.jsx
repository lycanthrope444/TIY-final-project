var React = require('react');

var SearchRequest = require('../models/proxy-models.js').SearchRequest;
var Results = require('../models/proxy-models.js').Results;
var proxy = require('../proxy.js');

class SearchBar extends React.Component{
  constructor(props){
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeSearchType = this.changeSearchType.bind(this);

    this.state ={
      searchType:'Character',
      searchTerm:''
    }
  }
  changeSearchType(term){
    console.log('clicked', term);
    this.setState({searchType:term});
    console.log(this.state);
  }
  handleSearch(e){
    this.setState({ searchTerm : e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();

    var smartSearch = this.state.searchTerm;
    var newSearch = new SearchRequest();

    newSearch.sendSearch(this.state.searchType, smartSearch);
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="navbar-form navbar-left">
            <SearchButton searchType={this.state.searchType} changeSearchType={this.changeSearchType} />
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
          <li><a onClick={()=>{this.props.changeSearchType('Character')}} role="button">Character</a></li>
          <li><a onClick={()=>{this.props.changeSearchType('Comics')}} role="button">Comics</a></li>
          <li><a onClick={()=>{this.props.changeSearchType('Creators')}} role="button">Creators</a></li>
          <li><a onClick={()=>{this.props.changeSearchType('Events')}} role="button">Events</a></li>
          <li><a onClick={()=>{this.props.changeSearchType('Series')}} role="button">Series</a></li>
          <li><a onClick={()=>{this.props.changeSearchType('Stories')}} role="button">Stories</a></li>
        </ul>
      </div>
    )
  }
}
module.exports = {SearchBar};
