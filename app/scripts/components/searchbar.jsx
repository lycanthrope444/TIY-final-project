var React = require('react');

class SearchBar extends React.Component{
  constructor(props){
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state ={
      searchType:'Character',
      searchTerm:''
    }
  }
  handleSearch(e){
    this.setState({ searchTerm : e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    var smartSearch = this.state.searchTerm;

    console.log(smartSearch);
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="navbar-form navbar-left">
            <div className="btn-group">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.searchType} <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                <li><a href="#">Character</a></li>
                <li><a href="#">Comics</a></li>
                <li><a href="#">Creators</a></li>
                <li><a href="#">Events</a></li>
                <li><a href="#">Series</a></li>
                <li><a href="#">Stories</a></li>
              </ul>
            </div>
            <input className="form-control" placeholder="Search" onChange={this.handleSearch} />
            <input type="submit" className ="btn" value="Search" />
          </div>
        </form>
      </div>
    )
  }
}

module.exports = {SearchBar};
