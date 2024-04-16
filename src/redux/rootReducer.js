import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
//
import AsyncStorage from '@react-native-async-storage/async-storage';
// slices
import audioReducer from './slices/audio';
import userReducer from './slices/user';
// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage = AsyncStorage;

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  audio: audioReducer,
  user: userReducer,
});

export default rootReducer;
