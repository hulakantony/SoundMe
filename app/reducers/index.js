import { combineReducers } from 'redux';
import { hasErrored, isLoading, genres, songsByGenre } from './reducers.js'

const rootReducer = combineReducers({  
  hasErrored,
  isLoading, 
  genres,
  songsByGenre,
});

export default rootReducer;
