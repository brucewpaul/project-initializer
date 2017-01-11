export const selectFramework = (framework) => {
  return{
    type: 'FRAMEWORK_CHOSEN',
    payload: framework
  }
}

export const selectDatabase = (database) => {
  return {
    type: 'DATABASE_CHOSEN',
    payload: database
  }
}

export const selectStyling = (styling) => {
  return {
    type: 'STYLING_CHOSEN',
    payload: styling
  }
}

export const taskRunner = (taskrunner) => {
  return {
    type: 'TASKRUNNER_CHOSEN',
    payload: taskrunner
  }
}

export const addTask = (task) => {
  return {
    type: 'TASK_ADDED',
    payload: task
  }
}

export const changeDisplayType = (display) => {
  return {
    type: 'CHANGE_DISPLAY',
    payload: display
  }
}

export const changeGuidedPage = (page) => {
  return {
    type: 'CHANGE_PAGE',
    payload: page
  }
}

export const addTesting = (testing)=> {
  return {
    type: 'TESTING_CHOSEN',
    payload: testing
  }
}

export const bundleID = (id)=> {
  return {
    type: 'BUNDLE_ID',
    payload: id
  }
}
