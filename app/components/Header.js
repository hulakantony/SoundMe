import React from 'react';
import Auth from '../containers/Auth';
import Search from '../containers/Search';

export default function Header(){
	return (
		<header id='header' className='clearfix'>
			<h1>SoundMe</h1>
			<div className='search-login-wrap'>
				<Search />	
				<Auth />
			</div>		
		</header>
	);
}