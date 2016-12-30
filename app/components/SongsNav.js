import React from 'react';
import { Link } from 'react-router';

export default function SongsNav ({genres, changeGenre}) {
	const genresArr = Array.from(genres);
	return (
		<ul className='genres-list'>
			{
				genresArr.map((el, index) => {
					const genreName = el.toLowerCase().replace(/\s/ig, '-');
					return (
						<li key={index}>
							<Link onClick={() => changeGenre(genreName)} to={genreName} activeClassName='active'>{el}</Link>
						</li>	
					)
				})
			}
		</ul>
	);
}