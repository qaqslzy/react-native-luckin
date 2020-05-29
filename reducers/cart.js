const ADD_TO_CART = "ADD_TO_CART"
const REMOVE_TO_CART = "REMOVE_TO_CART"
const CHECKOUT_REQUEST = "CHECKOUT_REQUEST"
const CHECKOUT_FAILURE = "CHECKOUT_FAILURE"
const SET_CART = "SET_CART"

const initialState = {
    addedIds: [],
    quantityById: {}
}

const addedIds = (state = initialState.addedIds, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.indexOf(action.productId) !== -1) {
                return state
            }
            return [...state, action.productId]
        case REMOVE_TO_CART:
            if (state.indexOf(action.productId) !== -1) {
                state.splice(state.indexOf(action.productId), 1)
                return state
            }
            return state
        default:
            return state
    }
}

const quantityById = (state = initialState.quantityById, action) => {
    const { productId } = action
    const baseNum = action.productNum || 1
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                [productId]: (state[productId] || 0) + baseNum
            }
        case REMOVE_TO_CART:
            if (productId in state) {
                if (state[productId] > 1)
                    return {
                        ...state,
                        [productId]: state[productId] - 1
                    }
                else {
                    delete state[productId]
                    return state
                }
            } else {
                return state
            }
        default:
            return state
    }
}

export const getQuantity = (state, productId) =>
    state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
    switch (action.type) {
        case CHECKOUT_REQUEST:
            return initialState
        case CHECKOUT_FAILURE:
            return action.cart
        case REMOVE_TO_CART:
            if (getQuantity(state, action.productId) > 1) {
                return {
                    addedIds: state.addedIds,
                    quantityById: quantityById(state.quantityById, action)
                }
            } else {
                return {
                    addedIds: addedIds(state.addedIds, action),
                    quantityById: quantityById(state.quantityById, action)
                }
            }
        case SET_CART:
            return {
                addedIds: action.data.addedIds,
                quantityById: action.data.quantityById
            }
        default:
            return {
                addedIds: addedIds(state.addedIds, action),
                quantityById: quantityById(state.quantityById, action)
            }
    }
}

export default cart