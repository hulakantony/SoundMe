import React, { Component } from 'react';
import SC from 'soundcloud';
import { CLIENT_ID } from '../consts/';
import { connect } from 'react-redux';
import { loginUser } from '../action/'

class Auth extends Component {
	handleAuth(e){
		e.preventDefault();
		const { loginUser } = this.props;
		loginUser()
	}
	render(){
		console.log(this.props.token);
		return (
			<a href='#' className='login-but' onClick={(e) => this.handleAuth(e)}></a>
		);
	}
}

const mapStateToProps = (state) => { 	
  return {
    token: state.auth_token, 
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (bool) => dispatch(loginUser(bool)),
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);