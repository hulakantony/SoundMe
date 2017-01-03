import { SONGS_LOADING, 
	SONGS_FETCH_SUCCESS, 
	FETCH_ERROR, 
	CLIENT_ID, 
	ROOT_URL,
	GET_GENRES, 
	GET_SONGS_BY_GENRE, 
	GET_MORE_SONGS,
	MORE_SONGS_LOADING,
	GET_PLAYER_SOURCES,
	GET_NEXT_SONG,
	GET_PREV_SONG } from '../consts/';

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
		fetch(`${ROOT_URL}linked_partitioning=1&${CLIENT_ID}&tags=${genre}&offset=0&limit=50`)
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

export function moreSongsIsLoading(bool) {
    return {
        type: MORE_SONGS_LOADING,
        isLoading: bool
    };
}

export function getMoreSongs() {
	return (dispatch, getState) => {
		const url = getState().songsByGenre.next_href;	
		dispatch(moreSongsIsLoading(true))	
		fetch(url)
		.then((response) => {
			if (!response.ok) {
                throw Error(response.statusText);
            } 
            setTimeout(()=>{
               dispatch(moreSongsIsLoading(false))
            }, 2000)
            
            return response;
		})
		.then((response) => response.json())
		.then((songs) => {
            dispatch(moreSongs(songs))           
        })
        .catch(() => dispatch(dataHasErrored(true)));
	}
}

export function getSongData(song) {
	return {
		type: GET_PLAYER_SOURCES,		
		audioUrl: song.stream_url,
		imageUrl: song.artwork_url,
		songName: song.title,
		id: song.id,
	}
}

/*export function getPrevSong(id) {
	return {
		type: GET_PREV_SONG,
		id
	}
}
export function getNextSong(id) {
	return {
		type: GET_NEXT_SONG,
		id
	}
}*/

