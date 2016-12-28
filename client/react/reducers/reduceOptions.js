const initialState = {
  frontEnd:{
    framework: null
  },
  backEnd: {
    database: null
  }
}

export default function(state = initialState, action) {

  switch(action.type) {
    case 'FRAMEWORK_CHOSEN':
      return Object.assign({}, state, {
        frontEnd: {
          framework: action.payload
        }
      })
    case 'DATABASE_CHOSEN':
      return Object.assign({} , state, {
        backEnd: {
          database: action.payload
        }
      })
    default:
      return state
  }

}