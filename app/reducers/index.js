import { combineReducers } from 'redux';
import { hasErrored, isLoading, genres, songsByGenre, moreLoading, player, auth_token } from './reducers.js'

const rootReducer = combineReducers({  
  hasErrored,
  isLoading, 
  genres,
  songsByGenre,
  moreLoading,
  player,
  auth_token,
});

export default rootReducer;
