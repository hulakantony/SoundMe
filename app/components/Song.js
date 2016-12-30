import React, { Component } from 'react';
import { CLIENT_ID } from '../consts/'
export default function Song ({song}) {
	const { title, artwork_url: image, tag_list, stream_url } = song;
	const songUrl = `${stream_url}?${CLIENT_ID}`;
	const cat = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ9eiIcFl-B4_Iis6J-NLR2PTCoNROksF2CJ9jHSk9A2UmYHJd9RJq6';
	return (
		<div className="song-item">
			<img src={image? image : cat} />
			<h3>{title}</h3>			
			<audio src={songUrl} controls ></audio>
		</div>
	);
}