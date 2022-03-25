import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Navigation, ResetButton } from './components';
import { configureStore } from './redux';
import './App.css';

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
