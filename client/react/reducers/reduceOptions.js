const initialState = {
  frontEnd:{
    framework: null,
    styling: 'Javascipt/HTML/CSS'
  },
  backEnd: {
    database: null
  },
  devTools: {
    taskRunner: {
      name: 'Grunt',
      plugins:['cssmin', 'uglify'],
      tasks:[
        {
          name: 'build',
          plugins: ['cssmin', 'uglify']
        }
      ],
    },
    testing: 'Mocha'
  },
  bundleId: null,
  user: {
    userId: null,
    userName: null,
    projectName: null
  }
}

export default function(state = initialState, action) {

  switch(action.type) {
    case 'FRAMEWORK_CHOSEN':
      return Object.assign({}, state, {
        frontEnd: {
          framework: action.payload,
          styling: state.frontEnd.styling
        }
      })
    case 'DATABASE_CHOSEN':
      return Object.assign({} , state, {
        backEnd: {
          database: action.payload
        }
      })
    case 'TASKRUNNER_CHOSEN':
      return Object.assign({} , state, {
        devTools: {
          taskRunner: {
            name: action.payload,
            plugins:[],
            tasks:[]
          },
          testing: state.devTools.testing
        }
      })
    case 'TASKS_SET':
      return Object.assign({} , state, {
        devTools: {
          taskRunner: {
            name: state.devTools.taskRunner.name,
            plugins: state.devTools.taskRunner.plugins,
            tasks: action.payload
          },
          testing: state.devTools.testing
        }
      })
    case 'SET_PLUGIN':
      return Object.assign({} , state, {
        devTools: {
          taskRunner: {
            name: state.devTools.taskRunner.name,
            plugins: action.payload,
            tasks: state.devTools.taskRunner.tasks
          },
          testing: state.devTools.testing
        }
      })
    case 'BUNDLE_ID':
      return Object.assign({} , state, {
        bundleId : action.payload
      })
    case 'USER_ID':
      return Object.assign({} , state, {
        user:{
          userId: action.payload,
          userName: state.user.userName,
          projectName: state.user.projectName
        }
      })
    case 'USER_NAME':
      return Object.assign({} , state, {
        user:{
          userId: state.user.userId,
          userName: action.payload,
          projectName: state.user.projectName
        }
      })
    case 'PROJECT_NAME':
      return Object.assign({} , state, {
        user:{
          userId: state.user.userId,
          userName: state.user.userName,
          projectName: action.payload
        }
      })
    default:
      return state
  }
}