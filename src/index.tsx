import ffcClient from 'ffc-js-client-side-sdk';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

//import { updateFfcFlags } from './app/ffcSlice';

const container = document.getElementById('root')!;
const root = createRoot(container);

// (async () => {
//   await ffcClient.waitUntilReady();
//   store.dispatch(updateFfcFlags(ffcClient.getAllFeatureFlags()));

//   root.render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </React.StrictMode>
//   );
// })();

// (async () => {
//   //await ffcClient.waitUntilReady();
//   store.dispatch(updateFfcFlags(ffcClient.getAllFeatureFlags()));
// })();

(async () => {
  await ffcClient.waitUntilReady();
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
