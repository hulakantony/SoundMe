import { SONGS_LOADING, 
    SONGS_FETCH_SUCCESS, 
    FETCH_ERROR, 
    GET_GENRES, 
    GET_SONGS_BY_GENRE, 
    GET_MORE_SONGS,
    MORE_SONGS_LOADING,
    GET_PLAYER_SOURCES } from '../consts/';

export function hasErrored(state = false, action) {
    switch (action.type) {
        case FETCH_ERROR:
            return action.hasErrored;

        default:
            return state;
    }
}

export function isLoading(state = false, action) {
    switch (action.type) {
        case SONGS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function moreLoading(state = false, action) {
    switch (action.type){
        case MORE_SONGS_LOADING:
            return action.isLoading;
        default: 
            return state;
    }
}

export function genres(state = [], action) {
    switch (action.type) {
        case GET_GENRES:
            return action.genres;
        default:
            return state;
    }
}

export function songsByGenre(state = {}, action) {
    switch (action.type) {
        case GET_SONGS_BY_GENRE:            
            return action.songs;
        case GET_MORE_SONGS:           
            return {...state, collection: state.collection.concat(action.plusSongs.collection), next_href: action.plusSongs.next_href};
        default:
            return state;
    }
}
const playerInitial = {
    audioUrl: '',
    imageUrl: '',
    songName: '',
    playing: false,
    id: 0
}
export function player(state = playerInitial, action) {
    switch (action.type) {
        case GET_PLAYER_SOURCES:
            return {...state, 
                audioUrl: action.audioUrl, 
                imageUrl: action.imageUrl,
                songName: action.songName,
                playing: true,
                id: action.id
            };
        /*case GET_NEXT_SONG:
            let copy = state.slice();
            const { id } = action;
            let nextSong;
            copy.forEach((el, i, arr) => {
                if(el.id === id){
                    nextSong = arr[i+1];
                }
            })
            return {...state,
                }*/
        default: 
            return state;
    }
}