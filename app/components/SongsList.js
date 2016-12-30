import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGenreSongs } from '../action/'
import Song from './Song';


export default class SongsList extends Component {
	componentDidMount(){
		const { getGenreSongs } = this.props;
		getGenreSongs('rock')
	}
	render(){
		const { songsByGenre } = this.props;
		const songs = songsByGenre.collection;
		return (
			<div className='songs-list'>
				{
					songs && songs.map(el => {
						return <Song key={el.id} song={el} />
					})
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => { 
	console.log(123, state)
  return {
    songsByGenre: state.songsByGenre,    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenreSongs: (genre) => dispatch(getGenreSongs(genre)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SongsList);