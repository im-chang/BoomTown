import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import RootReducer from './Modules/reducers';


const middleware = []

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
