const ADD_TO_COLLECTION = "ADD_TO_COLLECTION"
const SET_COLLECTION = "SET_COLLECTION"
const initialState = []

const collection = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_COLLECTION:
            const idx = state.indexOf(action.productId)
            if (idx !== -1) {
                state.splice(idx, 1)
                return [...state]
            }
            return [...state, action.productId]
        case SET_COLLECTION:
            return action.collection
        default:
            return state
    }
}

export default collection