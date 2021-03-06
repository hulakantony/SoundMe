import { SONGS_LOADING, 
    SONGS_FETCH_SUCCESS, 
    FETCH_ERROR, 
    GET_GENRES, 
    GET_SONGS_BY_GENRE, 
    GET_MORE_SONGS,
    MORE_SONGS_LOADING,
    GET_PLAYER_SOURCES,
    AUTH_USER } from '../consts/';

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

const songByGenreInitial = {
    collection: [],
    next_href: '',
    songLoading: false,
}
export function songsByGenre(state = {}, action) {
    switch (action.type) {
        case 'GENRE_SONGS_LOADING':
            return {...state, songLoading: true};
        case GET_SONGS_BY_GENRE:            
            return {...state, collection: action.songs.collection, next_href: action.songs.next_href , songLoading: false};
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
        default: 
            return state;
    }
}

export function auth_token(state = null, action) {
    switch (action.type) {
        case AUTH_USER:
            return action.token;
        default: 
            return state;
    }
}