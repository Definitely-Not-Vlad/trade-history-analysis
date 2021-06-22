import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import './style.css';
import { configureStore } from '../../redux';
import { Navigation, ResetButton } from '../';

const { persistor, store } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div id="appRoot">
          <Navigation />
          <ResetButton />
        </div>
      </PersistGate>
    </Provider>
  );
}
