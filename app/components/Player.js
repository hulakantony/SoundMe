import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CLIENT_ID, DEFAULT_IMG } from '../consts/'
import { getSongData } from '../action/'

import '../styles/player.css'

class Player extends Component {
	constructor(){
		super();
		this.state = {
			nowPlaying: false,
		}
	}
	playPrevSong(e){
		e.preventDefault();
		const { id } = this.props.playerInfo;
		const songs = this.props.songsByGenre.collection;	
		const { getSongData } = this.props;			
		songs.forEach((el, i, arr) => {
			if(el.id === id && i>=1){
				getSongData(arr[i-1]);
			} else if(i === 0){
				getSongData(el);
			}
		})	
	}
	playNextSong(e){
		e.preventDefault();
		const { id } = this.props.playerInfo;
		const songs = this.props.songsByGenre.collection;	
		const { getSongData } = this.props;		
		songs.forEach((el, i, arr) => {
			if(el.id === id && i < arr.length-1){
				getSongData(arr[i+1]);
			} else {
				return;
			}
		})
	}		
	onPause(){			
		this.setState({
			nowPlaying: false,
		})
	}
	onPlay(){				
		this.setState({
			nowPlaying: true,
		})
	}
	render() {		
		const { imageUrl, audioUrl, songName, playing } = this.props.playerInfo;
		const { nowPlaying } = this.state;
		if(playing) {
			return (
				<div id="player">
					<a href='#' className='arrow-but but-prev' onClick={(e) => this.playPrevSong(e)}></a>
					<audio onPlay={()=>this.onPlay()} onPause={()=>this.onPause()} onEnded={(e)=>this.playNextSong(e)} ref="audio" src={`${audioUrl}?${CLIENT_ID}`} controls autoPlay></audio>
					<div className='player-image-wrap'>
						<img src={imageUrl ? imageUrl : DEFAULT_IMG} />
					</div>
					<div className='song-name-wrap'>
						{songName}
					</div>					
					<a href='#' className='arrow-but but-next' onClick={(e)=>this.playNextSong(e)}></a>
				</div>
			)
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state) => {	
	return {
		playerInfo: state.player,
		songsByGenre: state.songsByGenre, 
	}
}

const mapDispatchToProps = (dispatch) => {
  return {    
    getSongData: (song) => dispatch(getSongData(song)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Player);