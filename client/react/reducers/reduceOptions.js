const initialState = {
  frontEnd:{
    framework: null,
    styling: 'Javascipt/html/css'
  },
  backEnd: {
    database: null
  },
  devtools: {
    taskrunner: {
      name: 'grunt',
      plugins:['cssmin', 'uglify'],
      tasks:[
      {
        name: 'cssmin',
        plugins:['cssmin']
      },
      {
        name:'uglify',
        plugins:['uglify']
      },
      {
        name: 'build',
        plugins: ['cssmin', 'uglify']
      }
      ]
    },
    bundler:{
      name: 'webpack',
      config:[]
    },
    testing: 'mocha/chai'
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
        devtools: {
          taskrunner: {
            name: action.payload.name,
            tasks:[]
          }
        }
      })
    case 'TASK_ADDED':
      return Object.assign({} , state, {
        devtools: {
          taskrunner: {
            name: state.devtools.taskrunner.name,
            tasks:[
            ...state.devtools.taskrunner.tasks,

            {
              name: action.payload.name,
              plugins: action.payload.plugins
            }

            ]
          }
        }
      })
    default:
      return state
  }

}