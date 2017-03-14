var React = require('react');

class SearchBar extends React.Component{
  constructor(props){
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state ={
      searchTerm:''
    }
  }
  handleSearch(e){
    this.setState({ searchTerm : e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.searchTerm);
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input className="form-control" placeholder="Search" onChange={this.handleSearch} />
            <span className="input-group-btn">
              <input type="submit" className ="btn" value="Search" />
            </span>
          </div>
        </form>
      </div>
    )
  }
}

module.exports = {SearchBar};
