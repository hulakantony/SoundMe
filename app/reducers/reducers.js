import { SONGS_LOADING, SONGS_FETCH_SUCCESS, FETCH_ERROR, GET_GENRES, GET_SONGS_BY_GENRE, GET_MORE_SONGS } from '../consts/';

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


export function genres(state = [], action) {
    switch (action.type) {
        case GET_GENRES:
            return action.genres;
        default:
            return state;
    }
}

export function songsByGenre(state = [], action) {
    switch (action.type) {
        case GET_SONGS_BY_GENRE:
            return action.songs;
        case GET_MORE_SONGS:
            return [...state, action.plusSongs];
        default:
            return state;
    }
}