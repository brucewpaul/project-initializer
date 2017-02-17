import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { Grid, Row, Col, Button, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

import TaskButton from '../parts/TaskButton';
import NavButton from '../parts/navButton';

import { changeTask, tasksSet, setPlugin } from '../../actions/index';
import { buildButton } from '../../utils/taskBuilderDesc';


class TaskDisplay extends React.Component {
  render () {
    return(
      <Row className='taskDisplay'>
        <Panel header='Task List' bsStyle="default">
          <ListGroup fill>
            {this.props.tasks.tasks.map((task, index)=>{
              return (
                <ListGroupItem key={index}><TaskButton task={task} key={index} id={index}/></ListGroupItem>
              )
            })}
          </ListGroup>
          <Button bsStyle="primary" block
              onClick={()=>{
                this.props.changeTask(addNewTask(this.props.tasks.tasks));
              }}
            >
              Add New Task
          </Button>
        </Panel>

        <LinkContainer to='/checkout'>
          <Button className='cartButton'  onClick={()=> {
            this.props.tasksSet(this.props.tasks.tasks);
            this.props.setPlugin(this.props.tasks.plugins);
          }}>
            Build
          </Button>
        </LinkContainer>
      </Row>
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
    changeTask: changeTask,
    tasksSet: tasksSet,
    setPlugin: setPlugin
  }, dispatch);
}
function addNewTask(tasks) {

  var newTask = {
    name: 'Enter Task Name',
    plugins:[]
  }
  tasks.push(newTask);
  return tasks;
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskDisplay);