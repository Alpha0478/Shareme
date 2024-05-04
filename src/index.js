import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import {io} from "socket.io-client"

const queryClient = new QueryClient()
const socket= io("http://192.168.0.105:5000")

// import {fetchPosts,urlEndpoint as cacheKey1} from './components/fetchers/fetch.js'
// import {fetchUser,usersUrlEndpoint as cacheKey2} from './components/fetchers/fetch.js'

// import {preload} from 'swr'

// preload(cacheKey1, fetchPosts)
// preload(cacheKey2, fetchUser)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <PersistGate loading = {null} persistor={persistor}>
       <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
             <App className="App" socket={socket}/>
           </HelmetProvider>
        </QueryClientProvider>
       </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

