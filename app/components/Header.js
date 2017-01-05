import React from 'react';
import Auth from '../containers/Auth';

export default function Header(){
	return (
		<header id='header' className='clearfix'>
			<h1>SoundMe</h1>	
			<Auth />		
		</header>
	);
}