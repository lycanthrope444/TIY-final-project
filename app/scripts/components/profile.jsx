var React = require('react');

var LayoutContainer = require('./layout.jsx').LayoutContainer;
var User = require('../models/user.js');


class ProfileContainer extends React.Component{
  constructor(props){
    super(props);

    this.state={
      username:''
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
        <AvatarPic />
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
  render(){
    return(
      <div className="col-md-6">
        Avatar Pic
      </div>
    )
  }
}
module.exports = {ProfileContainer};
