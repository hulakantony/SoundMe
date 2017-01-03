import { combineReducers } from 'redux';
import { hasErrored, isLoading, genres, songsByGenre, moreLoading, player } from './reducers.js'

const rootReducer = combineReducers({  
  hasErrored,
  isLoading, 
  genres,
  songsByGenre,
  moreLoading,
  player,
});

export default rootReducer;
