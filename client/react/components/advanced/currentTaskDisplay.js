import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, Panel, Form, ListGroup, ListGroupItem} from 'react-bootstrap';
import { currentTask, loadCf } from '../../actions/index';

import { backButton } from '../../utils/taskBuilderDesc';

import NavButton from '../parts/navButton';

class CurrentTaskDisplay extends React.Component {

  componentDidMount() {
    this.props.currentTask(this.props.tasks.tasks[0]);
  }

  render() {
    var title = (
      <Form inline>
        <FormGroup>
          <ControlLabel>
            Task Name
          </ControlLabel>
          {' '}
          <FormControl
            type='text'
            value={this.props.tasks.currentTask.name}
            onChange={
              (e)=>{this.props.currentTask(changeCurrentTaskName(this.props.tasks.currentTask, e.target.value))}
            }
            />
        </FormGroup>
      </Form>
    );

    return (
      <div className='currentTaskDisplay'>
        <Panel header={title} bsStyle="default">
          <ListGroup fill>
            {this.props.tasks.currentTask.plugins.map((plugin, index)=>{
              return <ListGroupItem key={index}>{plugin}</ListGroupItem>
            })}
          </ListGroup>
        </Panel>
        <NavButton button={backButton}/>
      </div>
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
    currentTask: currentTask,
    loadCf: loadCf
  }, dispatch);
}

function changeCurrentTaskName(task, name){
  task.name = name;
  return task;
}

export default connect(mapStateToProps, matchDispatchToProps)(CurrentTaskDisplay);