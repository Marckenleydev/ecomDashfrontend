import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { setupStore } from './store/store.ts';
const store = setupStore();

setupListeners(store.dispatch)

ReactDOM.createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
    <App />
    </Provider>


)
