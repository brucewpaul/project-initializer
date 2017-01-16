import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { currentTask } from '../../actions/index';

import { Button } from 'react-bootstrap';

class TaskButton extends React.Component {

  render() {
    return (
      <div
        onClick={()=>{
          this.props.currentTask(this.props.task);
        }}
      >
      {this.props.task.name}
      <Button
        onClick={()=>this.props.tasks.tasks.splice(this.props.id, 1)}
      >
        {this.props.id}
      </Button>
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
    currentTask: currentTask
  }, dispatch);
}



export default connect(mapStateToProps, matchDispatchToProps)(TaskButton);