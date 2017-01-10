import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGenreSongs, getSongData } from '../action/'
import Song from './Song';
import Spinner from './Spinner';
import { browserHistory } from 'react-router'


export default class SongsList extends Component {	
	componentDidMount(){
		const { getGenreSongs } = this.props;
		const pathName = this.props.location.pathname.slice(1);		
		getGenreSongs(pathName)		
	}	
	componentWillReceiveProps(nextProps){
		if (this.props.location.pathname !== nextProps.location.pathname) {
			const { getGenreSongs } = this.props;
    		getGenreSongs(nextProps.location.pathname)
    	}
	}
	songToStore(e, song){
		e.preventDefault()
		const { getSongData } = this.props;
		getSongData(song);
	}	
	pauseSongHandler(e) {
		e.preventDefault();
		const { pauseSong } = this.props;
		pauseSong();
	}
	render(){
		const { songsByGenre, moreLoading, nowPlaying, nowPlayingId } = this.props;
		const songs = songsByGenre.collection;				
		return (			
			<div className='songs-list'>
				
				{
					songs && songs.map((el,index) => {
						return <Song 
							nowPlaying={el.id === nowPlayingId} 
							songToStore={(e, song) => this.songToStore(e, song)} 							
							key={el.id} 
							song={el} />
					})
				}
				{moreLoading && <Spinner />}
			</div>
		);
	}
}

const mapStateToProps = (state) => { 	
  return {
    songsByGenre: state.songsByGenre, 
    moreLoading: state.moreLoading,     
    nowPlayingId: state.player.id,  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenreSongs: (genre) => dispatch(getGenreSongs(genre)),
    getSongData: (song) => dispatch(getSongData(song)),    
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SongsList);