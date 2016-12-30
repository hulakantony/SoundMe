import { debounce } from '../helpers/';
import { SONGS_LOADING, SONGS_FETCH_SUCCESS, FETCH_ERROR, CLIENT_ID, ROOT_URL, GET_GENRES, GET_SONGS_BY_GENRE, GET_MORE_SONGS } from '../consts/';

export function dataHasErrored(bool) {
    return {
        type: FETCH_ERROR,
        hasErrored: bool
    };
}

export function songsIsLoading(bool) {
    return {
        type: SONGS_LOADING,
        isLoading: bool
    };
}

export function genreList(genres) {
	return {
		type: GET_GENRES,
		genres
	}
}

export function songsByGenreList(songs) {
	return {
		type: GET_SONGS_BY_GENRE,
		songs
	}
}

export function getSongsData() {
	return (dispatch) =>{
		dispatch(songsIsLoading(true));
		fetch(`${ROOT_URL}${CLIENT_ID}`)
			.then((response) => {
				if (!response.ok) {
                    throw Error(response.statusText);
                }               
                
                dispatch(songsIsLoading(false))               
                return response;
			})
			.then((response) => response.json())
            .then((songs) => {            	
            	let genres = new Set();
            	songs.forEach(el => {            		
            		if(el.genre){
            			genres.add(el.genre);
            		}
            	})
            	dispatch(genreList(genres));
            })
            .catch(() => dispatch(dataHasErrored(true)));
	};
}

export function getGenreSongs(genre) {
	return (dispatch) => {
		fetch(`${ROOT_URL}linked_partitioning=1&${CLIENT_ID}&tags=${genre}&offset=50&limit=100`)
		.then((response) => {
			if (!response.ok) {
                throw Error(response.statusText);
            }                           
            return response;
		})
		.then((response) => response.json())
		.then((genreSongs) => {
            dispatch(songsByGenreList(genreSongs))           
        })
        .catch(() => dispatch(dataHasErrored(true)));
	}
}

export function moreSongs(plusSongs) {
	return {
		type: GET_MORE_SONGS,
		plusSongs
	}
}

export function getMoreSongs() {
	return (dispatch, getState) => {
		const url = store.getState().songsByGenre.next_url;
		fetch(url)
		.then((response) => {
			if (!response.ok) {
                throw Error(response.statusText);
            }                           
            return response;
		})
		.then((response) => response.json())
		.then((songs) => {
            dispatch(moreSongs(genreSongs))           
        })
        .catch(() => dispatch(dataHasErrored(true)));
	}
}
