var Backbone = require('backbone');
var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var User = require('../models/user.js');
var ParseFile = require('../models/parse.js').ParseFile;

class ProfileContainer extends React.Component{
  constructor(props){
    super(props);

    this.state={
      username:'',
      image:null,
      preview:null
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
        <AvatarPic image={this.state.image} preview={this.state.preview} />
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

    this.handleSubmit= this.handleSubmit.bind(this);

    this.state ={
      avatar: this.props.image,
      preview: this.props.preview
    }
  }
  handleImageChange(e){
    // step 1: get the file object from the form
    var imageData = e.target.files[0];
    this.setState({avatar: image});

    var reader = new FileReader();
    reader.onloadend= ()=>{
      this.setState({preview: reader.result})
    }

    reader.readAsDataURL(imageData);
    // step 2: new parse model with the name set


    // step 3: ajax request to save image to the server
    console.log(imageData);

  }
  handleSubmit(){
    var image = this.state.avatar;
    var avatar = new ParseFile(image);
    image.set({name: imageData.name});

    image.save({}, {
      data: imageData,
      contentType: imageData.type
    }).then((response) => {
      // step 4: save the image url to the recipe state
      var imageUrl = response.url;

      // Here is where the object that the pic would be saved under

      //create a new object with the info that will be saved to Parse

      //Make sure that Parse has the endpoints for the object

      //This is also a good time to navigate away after the AJAX request finishes

      console.log(response);

    });
  }
  render(){
    return(
      <div className="col-md-6">
        <form encType="multipart/form-data" onSumbit={this.handleSubmit}>
          <img src={this.state.preview} />
          <div className="form-group">
            <label htmlFor="image">Upload your Avatar!</label>
            <input onChange={this.handleImageChange} filename={this.state.image}
              className="form-control" name="image" type="file"
              placeholder="Avatar!" />
          </div>
          <button type="submit" className="btn"> Submit </button>
        </form>
      </div>
    )
  }
}
module.exports = {ProfileContainer};
