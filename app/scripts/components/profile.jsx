var Backbone = require('backbone');
var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var User = require('../models/user.js');
var ParseFile = require('../models/file.js').ParseFile;

class ProfileContainer extends React.Component{
  constructor(props){
    super(props);

    this.state={
      username:'',
      image:''
    }
  }
  componentWillMount(){
    var local = JSON.parse(localStorage.getItem('username'));
    this.setState({username:local.username});
  }
  render(){
    return(
      <LayoutContainer>
        <AccountOptions />
        <AvatarPic image={this.state.image}/>
      </LayoutContainer>
    )
  }
}

class AccountOptions extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="col-md-6">
        Account Options
      </div>
    )
  }
}

class AvatarPic extends React.Component{
  constructor(props){
    super(props);

    this.state ={
      image: this.props.image
    }
  }
  handleImageChange(e){
    // step 1: get the file object from the form
    var imageData = e.target.files[0];

    // step 2: new parse model with the name set
    var image = new ParseFile();
    image.set({name: imageData.name});

    // step 3: ajax request to save image to the server
    console.log(imageData);
    image.save({}, {
      data: imageData,
      contentType: imageData.type
    }).then(() => {
      // step 4: save the image url to the recipe state
      this.setState({image: image});
    });
  }
  render(){
    return(
      <div className="col-md-6">
        <img src=""/>
        <div className="form-group">
          <label htmlFor="image">Upload your Avatar!</label>
          <input onChange={this.handleImageChange} filename={this.state.image} className="form-control" name="image" type="file" placeholder="Avatar!" />
        </div>
      </div>
    )
  }
}
module.exports = {ProfileContainer};
