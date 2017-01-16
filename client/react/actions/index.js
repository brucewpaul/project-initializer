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

export const taskRunner = (taskrunner) => {
  return {
    type: 'TASKRUNNER_CHOSEN',
    payload: taskrunner
  }
}

export const tasksSet = (taskArr)=> {
  return {
    type: 'TASKS_SET',
    payload: taskArr
  }
}

export const changeTask = (tasks) => {
  return {
    type: 'CHANGE_TASK',
    payload: tasks
  }
}

export const changePlugins = (plugins) => {
  return {
    type: 'CHANGE_PLUGINS',
    payload: plugins
  }
}

export const bundleID = (id)=> {
  return {
    type: 'BUNDLE_ID',
    payload: id
  }
}

export const userID = (userId)=> {
  return {
    type: 'USER_ID',
    payload: userId
  }
}

export const userName = (userName)=> {
  return {
    type: 'USER_NAME',
    payload: userName
  }
}

export const projectName = (projectName)=> {
  return {
    type: 'PROJECT_NAME',
    payload: projectName
  }
}

export const currentTask = (task)=> {
  return {
    type: 'CHANGE_CURRENT_TASK',
    payload: task
  }
}

export const loadCf = (suggestions)=> {
  return {
    type: 'LOAD_CF',
    payload: suggestions
  }
}
