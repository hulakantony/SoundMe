import React, { Component } from 'react';
import { CLIENT_ID, DEFAULT_IMG } from '../consts/'
export default function Song ({song, songToStore, nowPlaying}) {
	const { title, artwork_url: image, stream_url } = song;
	const songUrl = `${stream_url}?${CLIENT_ID}`;	
	return (
		<div className="song-item">
			<div className={nowPlaying ? 'filter img-wrap' : 'img-wrap'}>
				<img src={image? image : DEFAULT_IMG} />
				<div className='cover'>
					<a href='#' className='play-button' onClick={(e)=>songToStore(e, song)}></a>
				</div>
			</div>
			<h3>{title}</h3>			
			<button onClick={()=>songToStore(song)}>Play</button>			
		</div>
	);
}