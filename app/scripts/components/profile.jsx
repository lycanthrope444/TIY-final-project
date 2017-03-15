var Backbone = require('backbone');
var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var User = require('../models/user.js');
var ParseFile = require('../models/parse.js').ParseFile;
var Avatar = require('../models/avatar.js').Avatar;

class ProfileContainer extends React.Component{
  constructor(props){
    super(props);

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state={
      username:'',
      userID:'',
      avatar:null,
      preview:null
    }
  }
  componentWillMount(){
    var local = JSON.parse(localStorage.getItem('username'));
    this.setState({username:local.username});
    this.setState({username:local.objectId});
  }
  handleImageChange(imageData){
    var reader = new FileReader();
    reader.onloadend= ()=>{
      this.setState({preview: reader.result})
    }

    reader.readAsDataURL(imageData);
    this.setState({avatar: imageData});
    console.log(imageData);
  }
  handleSubmit(){
    console.log('master submit worked 1');
    var image = this.state.avatar;
    var avatar = new ParseFile(image);

    avatar.save({}, {
      data: image,
    }).then((response) => {
      var imageUrl = response.url;

      var avatarInfo = new Avatar();

      avatarInfo.setPointer('user_info', '_User', this.state.userID);

      avatarInfo.set({
        pic: {
          url: imageUrl
        }
      });

      avatarInfo.save().then(function(){
        console.log(avatarInfo);
      });

      console.log('master submit worked 2');
      //Make sure that Parse has the endpoints for the object

      //This is also a good time to navigate away after the AJAX request finishes

      console.log(response);
    });
  }
  render(){
    return(
      <LayoutContainer>
        <AccountOptions />
        <AvatarPic image={this.state.image} preview={this.state.preview}
          handleImageChange={this.handleImageChange}
          handleSubmit={this.handleSubmit} preview={this.state.preview} />
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

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state ={
      avatar: this.props.image,
      preview: this.props.preview
    }
  }
  handleImageChange(e){
    // step 1: get the file object from the form
    var imageData = e.target.files[0];

    this.props.handleImageChange(imageData);

  }
  handleSubmit(e){
    e.preventDefault();
    console.log('dummy worked');
    this.props.handleSubmit();
  }
  render(){
    return(
      <div className="col-md-6">
        <form type="submit" encType="multipart/form-data">
          <img src={this.props.preview} />
          <div className="form-group">
            <label htmlFor="image">Upload your Avatar!</label>
            <input onChange={this.handleImageChange} filename={this.state.image}
              className="form-control" name="image" type="file" />
          </div>
          <button type="submit" className="btn" onClick={this.handleSubmit}> Submit </button>
        </form>
      </div>
    )
  }
}
module.exports = {ProfileContainer};
