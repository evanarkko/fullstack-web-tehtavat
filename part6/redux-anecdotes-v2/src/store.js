import { createStore, combineReducers, applyMiddleware } from 'redux'
import aReducer from './reducers/anecdoteReducer'
import nReducer from './reducers/notificationReducer'
import fReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    anecdotes: aReducer,
    notification: nReducer,
    filter: fReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
})

export default store