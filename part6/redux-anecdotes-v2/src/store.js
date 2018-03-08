import { createStore, combineReducers } from 'redux'
import aReducer from './reducers/anecdoteReducer'
import nReducer from './reducers/notificationReducer'
import fReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: aReducer,
    notification: nReducer,
    filter: fReducer
})

const store = createStore(reducer)

store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
})

export default store