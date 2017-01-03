const initialDisplay = {
  display: 'basic',
  page: {
    name: 'cart',
    listTitle: 'Cart',
    colSize: 4,
    colOffset:0
  }
}

export default function(state = initialDisplay, action) {

  switch(action.type) {
    case 'CHANGE_DISPLAY':
      return Object.assign({}, state, {
        display: action.payload,
        page: state.page
      })
    case 'CHANGE_PAGE':
      return Object.assign({}, state, {
        display: state.display,
        page: action.payload
      })
    default :
      return state
  }
}