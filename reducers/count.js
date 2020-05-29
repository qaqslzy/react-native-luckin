const count = (state = 0, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const baseNum = action.productNum || 1
      return state + baseNum
    case 'REMOVE_TO_CART':
      return state - 1
    case "CHECKOUT_REQUEST":
      return 0
    case "SET_CART":
      return action.num
    default:
      return state
  }
}

export default count