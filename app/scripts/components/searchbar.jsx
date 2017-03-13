var React = require('react');

class SearchBar extends React.Component{
  render(){
    return(
      <div>
        <form>
          <div className="input-group">
            <input className="form-control"/>
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
