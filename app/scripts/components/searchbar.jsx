var Backbone = require('backbone');
var React = require('react');

var SearchRequest = require('../models/proxy-models.js').SearchRequest;
var Results = require('../models/proxy-models.js').Results;
var Results = require('../models/proxy-models.js').Results;
var proxy = require('../proxy.js');

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    var searchType = this.props.searchType;
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeSearchType = this.changeSearchType.bind(this);
    this.changeModType = this.changeModType.bind(this);

    this.state ={
      searchType:searchType,
      searchTerm:'',
      searchMod:{
        title:'Exact Name',
        charAction: 'name=',
        otherAction: 'title='
      }
    }
  }
  changeSearchType(term){

    this.props.changeSearchType(term);
    this.setState({searchType:term});
  }
  changeModType(termObject){

    if (this.state.searchType === 'characters'||this.state.searchType === 'events'){
      console.log('changeModType',termObject.charAction);
      this.props.changeModType(termObject.charAction);
    } else {
      console.log('changeModType',termObject.otherAction);
      this.props.changeModType(termObject.otherAction);
    }

    this.setState({searchMod:termObject});
  }
  handleSearch(e){
    this.setState({ searchTerm : e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();

    var searchTerm = this.state.searchTerm;
    var searchType = this.state.searchType;
    var searchMod;
    if (this.state.searchType === 'characters'||this.state.searchType === 'events'){
      searchMod = this.state.searchMod.charAction;
    } else {
      searchMod = this.state.searchMod.otherAction;
    }


    this.props.handleSubmit(searchType, searchTerm, searchMod);
  }
  render(){
    return(
      <div className="col-md-12">
        <form onSubmit={this.handleSubmit} className="form-inline">
          <div className="form-group">
            <button className="btn btn-default" data-toggle="modal"
              onClick={(e)=>{e.preventDefault();} } data-target="#myModal">
              <i className="fa fa-question-circle" aria-hidden="true"></i>
            </button>
            <HelpModal />
            <SearchButton searchType={this.state.searchType} changeSearchType={this.changeSearchType} />
            <FlexButton searchMod={this.state.searchMod} changeModType={this.changeModType} />
            <input className="form-control" placeholder="Search" onChange={this.handleSearch} />
            <input type="submit" className ="btn btn-interact" value="Search" />
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
          {this.props.searchMod.title}
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a onClick={()=>{this.props.changeModType({
            title:'Exact Name',
            charAction: 'name=',
            otherAction: 'title='
          })}} role="button">Exact Name</a></li>
          <li><a onClick={()=>{this.props.changeModType({
            title:'Starts With',
            charAction: 'nameStartsWith=',
            otherAction: 'titleStartsWith='
          })}} role="button">Starts With</a></li>
        </ul>
      </div>
    )
  }
}

class HelpModal extends React.Component{
  render(){
    return(
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Search F.A.Q.</h4>
              </div>
              <div className="modal-body">
                Marvel's database does not have a lot a smart search features which can make it difficult to find the titles you are looking for.
                I've compiled a list of useful tips to help you search here.
                <ul>
                  <li>If you are looking to browse, you can simply select the topic you want and hit "search".</li>
                  <li>The database is frequently updated, but newer items are often missing key data, like characters.</li>
                  <li>While extensive, not everything is listed or 100% accurrate.</li>
                  <li>Exact name for comics and series will often not work. I recommend using the "Starts With" button.</li>
                  <li>Teams of characters are filed under "Characters".</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
module.exports = {SearchBar};
