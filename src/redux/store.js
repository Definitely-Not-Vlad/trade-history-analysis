import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import thaReducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, thaReducers);

const logger = createLogger({
  collapsed: true,
  actionTransformer: action => ({
    ...action,
    type: String(action.type),
  }),
});

const middlewares = [thunk];

// middlewares.push(logger);

const configureStore = () => {
  const store = compose(applyMiddleware(...middlewares))(createStore)(
    persistedReducer,
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
