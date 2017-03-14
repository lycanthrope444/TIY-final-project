var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;

class ResultsContainer extends React.Component{
  render(){
    return(
      <LayoutContainer>
        <ResultsHeader />
        <ResultsDisplay />
      </LayoutContainer>
    )
  }
}

class ResultsHeader extends React.Component{
  render(){
    return(
      <div>

      </div>
    )
  }
}

class ResultsDisplay extends React.Component{
  render(){
    return(
      <div>
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src="..." alt="...">
              <div className="caption">
                <h3>Thumbnail label</h3>
                <p>...</p>
                <p><a href="#" className="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = {ResultsContainer};
