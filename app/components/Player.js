import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CLIENT_ID, DEFAULT_IMG } from '../consts/'
import { getSongData } from '../action/'

class Player extends Component {
	constructor(){
		super();
		this.state = {
			nowPlaying: false,
		}
	}
	playPrevSong(){
		const { id } = this.props.playerInfo;
		const songs = this.props.songsByGenre.collection;	
		const { getSongData } = this.props;			
		songs.forEach((el, i, arr) => {
			if(el.id === id && i>=1){
				getSongData(arr[i-1]);
			} else if(i===0){
				getSongData(el);
			}
		})	
	}
	playNextSong(){
		const { id } = this.props.playerInfo;
		const songs = this.props.songsByGenre.collection;	
		const { getSongData } = this.props;		
		songs.forEach((el, i, arr) => {
			if(el.id === id){
				getSongData(arr[i+1]);
			}
		})		
	}	
	onPlay(){		
		const { audio } = this.refs;
		const { nowPlaying } = this.state;
		!nowPlaying ? audio.pause() : audio.play()
		this.setState({
			nowPlaying: !nowPlaying,
		})
	}
	render() {		
		const { imageUrl, audioUrl, songName, playing } = this.props.playerInfo;
		const { nowPlaying } = this.state;
		return (
			<div id="player">
				{playing && <audio onEnded={()=>this.playNextSong()} ref="audio" src={`${audioUrl}?${CLIENT_ID}`} controls autoPlay></audio> }
				<img src={imageUrl ? imageUrl : DEFAULT_IMG} />
				<p>{songName}</p>
				<button onClick={() => this.playPrevSong()}>prev</button>
				<button onClick={()=>this.onPlay()}>{!nowPlaying ? 'pause' : 'play'}</button>
				<button onClick={()=>this.playNextSong()}>next</button>
			</div>
		);
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