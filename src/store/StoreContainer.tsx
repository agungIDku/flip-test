import { createStore, applyMiddleware,combineReducers } from 'redux'
import thunk from 'redux-thunk'

//REDUCERS
import TransactionReducer from '@/store/reducers/TransactionReducer'

const rootReducer = combineReducers({
    transaction : TransactionReducer
})
export default function configureStore() {
 return createStore(
  rootReducer,
  applyMiddleware(thunk)
 );
}