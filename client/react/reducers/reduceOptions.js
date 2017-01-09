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
    case 'STYLING_CHOSEN':
      return Object.assign({} , state, {
        frontEnd: {
          framework: state.frontEnd.framework,
          styling: action.payload
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
          bundler: state.devTools.bundler,
          testing: state.devTools.testing
        }
      })
    case 'TASK_ADDED':
      return Object.assign({} , state, {
        devtools: {
          taskrunner: {
            name: state.devTools.taskRunner.name,
            tasks:[
            ...state.devtools.taskrunner.tasks,

            {
              name: action.payload.name,
              plugins: action.payload.plugins
            }

            ]
          },
          bundler: state.devTools.bundeler,
          testing: state.devTools.testing
        }
      })
      case 'TESTING_CHOSEN':
      return Object.assign({} , state, {
        devTools: {
          taskRunner: {
            name: state.devTools.taskRunner.name,
            plugins:[],
            tasks:[]
          },
          bundler: state.devTools.bundler,
          testing: action.payload
        }
      })
    default:
      return state
  }

}