import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { currentTask, loadCf } from '../../actions/index';

import { backButton } from '../../utils/taskBuilderDesc';

import NavButton from '../parts/navButton';

class CurrentTaskDisplay extends React.Component {

  componentDidMount() {
    this.props.currentTask(this.props.tasks.tasks[0]);
  }

  render() {

    return (
      <Col xsOffset={2}>
        <div className='currentTaskDisplay'>
          <form>
            <FormGroup>
              <ControlLabel>
                Enter Task Name
              </ControlLabel>
              <FormControl
                type='text'
                value={this.props.tasks.currentTask.name}
                onChange={
                  (e)=>{this.props.currentTask(changeCurrentTaskName(this.props.tasks.currentTask, e.target.value))}
                }
                />
            </FormGroup>
          </form>
          <ul>
            {this.props.tasks.currentTask.plugins.map((plugin, index)=>{
              return <li key={index}>{plugin}</li>
            })}
          </ul>
        </div>
        <NavButton button={backButton}/>
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
    currentTask: currentTask,
    loadCf: loadCf
  }, dispatch);
}

function changeCurrentTaskName(task, name){
  task.name = name;
  return task;
}

export default connect(mapStateToProps, matchDispatchToProps)(CurrentTaskDisplay);