import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGenreSongs, getSongData } from '../action/'
import Song from '../components/Song';
import Spinner from '../components/Spinner';
import { browserHistory } from 'react-router'


export default class SongsList extends Component {	
	componentDidMount(){
		const { getGenreSongs } = this.props;
		let filter = new RegExp(/\//g);
		const pathName = this.props.location.pathname.replace(filter, '');
		console.log(pathName)		
		getGenreSongs(pathName)		
	}	
	componentWillReceiveProps(nextProps){
		let filter = new RegExp(/\//g);
		if (this.props.location.pathname !== nextProps.location.pathname) {
			const { getGenreSongs } = this.props;			
    		getGenreSongs(nextProps.location.pathname.replace(filter, ''))
    	}
	}
	songToStore(e, song){
		e.preventDefault()
		const { getSongData } = this.props;
		getSongData(song);
	}	
	render(){
		const { songsByGenre, moreLoading, nowPlayingId } = this.props;
		const { songLoading } = songsByGenre;
		const songs = songsByGenre.collection;				
		return (			
			<div className='songs-list'>
				
				{
					!songLoading ?
					songs && songs.map((el,index) => {
						return <Song 
							nowPlaying={el.id === nowPlayingId} 
							songToStore={(e, song) => this.songToStore(e, song)} 							
							key={el.id} 
							song={el} />
					}) : <Spinner />
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