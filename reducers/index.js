import { combineReducers } from 'redux'
import cart from './cart'
import products  from './products'
import count from './count'
import collection from './collection'

export default combineReducers({
    cart,
    products,
    count,
    collection
  })
  