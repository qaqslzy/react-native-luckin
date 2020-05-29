const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS"


export const initialState = {
    data: {

    }
}

export const getProduct = (state, id) => state.data[id]

const products = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            return {data: action.data}
        default:
            return state
    }
}

export default products