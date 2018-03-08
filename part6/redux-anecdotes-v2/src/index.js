import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store'
import { Provider } from 'react-redux'
import {anecdotesInit} from "./reducers/anecdoteReducer";
import anecdoteService from './services/anecdotes'


const render = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
    ,
    document.getElementById('root')
  )
}

anecdoteService.getAll().then(anecdotes => store.dispatch(anecdotesInit(anecdotes)))

render()
store.subscribe(render)