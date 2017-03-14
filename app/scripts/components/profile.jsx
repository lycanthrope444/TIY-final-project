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
  handleImageChange(){

  }
  render(){
    return(
      <div className="col-md-6">
        <img />
        <div className="form-group">
          <label htmlFor="image">Upload your Avatar!</label>
          <input onChange={this.handleImageChange} filename={this.state.image} className="form-control" name="image" type="file" placeholder="Avatar!" />
        </div>
      </div>
    )
  }
}
module.exports = {ProfileContainer};
