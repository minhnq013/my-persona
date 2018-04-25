import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import DevTools from './containers/devTools';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';


const root = document.getElementById('root');
const store = configureStore();

ReactDOM.render(<Provider store={store}>
  <div>
    <App />
    <DevTools />
  </div>
</Provider>, root);

registerServiceWorker();
