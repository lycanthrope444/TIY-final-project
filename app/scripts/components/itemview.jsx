var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var Comic = require('../models/comics.js').Comic;

var demoData = {
  name: 'The Incredible Hulk',
  number: 181,
  description: 'Hulk fights Wolverine',
  pic: 'https://unsplash.it/200/300',
  collectible: true
};

var demoComic = new Comic(demoData);

class ItemContainer extends React.Component{
  constructor(props){
    super(props);
    //Call Model Here - populate
    var name = demoComic.get('name');
    var desc = demoComic.get('description');
    var pic = demoComic.get('pic');

    this.state ={
      name:name,
      desc:desc,
      pic:pic
    }
  }
  render(){
    console.log(this.state);
    return(
      <LayoutContainer>
        <ItemInfo desc={this.state.desc} name={this.state.name} />
        <ItemPhoto pic={this.state.pic}/>
        <QuickLinks />
      </LayoutContainer>
    )
  }
}

class ItemInfo extends React.Component{
  render(){
    return(
      <div className="col-md-6">
        <h1>{this.props.name}</h1>
        <p>{this.props.desc}</p>
      </div>
    )
  }
}

class ItemPhoto extends React.Component{
  render(){
    console.log(this);
    return(
      <div className="col-md-6">
        <img src={this.props.pic}/>
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

module.exports = {ItemContainer};
