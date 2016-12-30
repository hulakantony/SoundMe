import React from 'react'
import { Route, IndexRedirect } from 'react-router';
import Home from './containers/Home';
import SongsList from './components/SongsList'

export const routes = (
	<Route path='/' component={Home}>
		<IndexRedirect to='/rock' component={Home} />
		<Route path='/:genre' component={SongsList} />		
	</Route>
)