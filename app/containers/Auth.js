import React, { Component } from 'react';
import SC from 'soundcloud';
import { CLIENT_ID } from '../consts/';
import { connect } from 'react-redux';
import { loginUser, initialAuth, logoutUser } from '../action/'

class Auth extends Component {
	componentDidMount(){
		const { initialAuth } = this.props;
		initialAuth()
	}
	handleLogin(e){
		e.preventDefault();
		const { loginUser } = this.props;
		loginUser()
	}
	handleLogout(e){
		e.preventDefault();
		const { logoutUser } = this.props;
		logoutUser();
	}
	render(){
		const { token } = this.props;
		if(!token) {
			return <a href='#' className='login-but' onClick={(e) => this.handleLogin(e)}></a>
		} else {
			return (
				<div className='user-data-wrap'>
					<span>{token.username}</span>
					<a href='#' className='logout-but' onClick={(e) => this.handleLogout(e)}></a>
				</div>
			);
		}		
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
    initialAuth: () => dispatch(initialAuth()),
    logoutUser: () => dispatch(logoutUser()),
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);