import React, { Component } from 'react';
import { CLIENT_ID, DEFAULT_IMG } from '../consts/'
export default function Song ({song, songToStore, nowPlaying}) {
	const { title, artwork_url: image, stream_url } = song;
	const songUrl = `${stream_url}?${CLIENT_ID}`;	
	return (
		<div className="song-item">
			<div className='img-wrap'>
				{nowPlaying && <div className='darkness'></div>}
				<img src={image? image : DEFAULT_IMG} />
				<div className='cover'>
					{!nowPlaying && <a href='#' className='play-button' onClick={(e)=>songToStore(e, song)}></a>}
				</div>
			</div>
			<h4>{title}</h4>						
		</div>
	);
}