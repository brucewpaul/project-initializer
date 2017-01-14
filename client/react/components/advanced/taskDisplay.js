import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Grid, Row, Col, Button} from 'react-bootstrap';

import TaskButton from '../parts/TaskButton';

import { changeTask } from '../../actions/index';


class TaskDisplay extends React.Component {
  render () {
    return(
      <Col xs={3} xsOffset={9} className='taskHolder'>
      {this.props.tasks.currentTask.name}
        {this.props.tasks.tasks.map((task, index)=>{
          return (
            <Row key={index}>
              <TaskButton task={task} key={index} id={index}/>
            </Row>
          )
        })}
        <Button
          onClick={()=>{
            this.props.changeTask(addNewTask(this.props.tasks.tasks));
          }}
        >
          Add Task
        </Button>
      </Col>
    )
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    tasks: state.display
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    changeTask: changeTask
  }, dispatch);
}
function addNewTask(tasks) {

  var newTask = {
    name: 'Task',
    plugins:[]
  }
  tasks.push(newTask);
  return tasks;
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskDisplay);