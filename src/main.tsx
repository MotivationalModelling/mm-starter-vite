import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {store} from './app/store';

import App from './app/App.tsx'

import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import {registerLocale} from 'react-datepicker';
import en_au from 'date-fns/locale/en-AU';

// ---------------------------------------------------------------------------

registerLocale('en_au', en_au)

// ---------------------------------------------------------------------------

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
)
// ---------------------------------------------------------------------------

