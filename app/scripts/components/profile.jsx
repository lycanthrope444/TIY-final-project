var Backbone = require('backbone');
var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var User = require('../models/user.js');
var parse = require('../setup.js').parse;
var ParseModel = require('../models/parse.js').ParseModel;
var ParseFile = require('../models/parse.js').ParseFile;
var Avatar = require('../models/avatar.js').Avatar;
var AvatarCollection = require('../models/avatar.js').AvatarCollection;

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
    this.setState({userID:local.objectId});

    var avatarCollection = new AvatarCollection();
    avatarCollection.fetch().then(function(){
      console.log('2',avatarCollection);
    });

    avatarCollection.parseWhere('User','_User' , local.objectId).fetch().then(function(){
      // var search = avatarCollection.parseWhere('User','_User' ,'zSiiwwkEpI');

      console.log('1',avatarCollection);

      // search.fetch().then(function(){
      //
      //   console.log(search);
      //
      // });
    });

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

      avatarInfo.setPointer('User', '_User', this.state.userID);

      avatarInfo.set({
        pic: {
          url: imageUrl
        }
      });

      avatarInfo.save().then(function(){
        console.log(avatarInfo);
      });

      //This is also a good time to navigate away after the AJAX request finishes
    });
  }
  render(){
    return(
      <LayoutContainer username={this.state.username}>
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
        <h1>Account Options</h1>
        <ul>
          <li>Change Email</li>
          <li>View my Collection</li>
        </ul>
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
