import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';


import { currentTask, loadCf } from '../../actions/index';

import { Button } from 'react-bootstrap';

class TaskButton extends React.Component {

  render() {
    return (
      <div
        onClick={()=>{
          this.props.currentTask(this.props.task);
          setTimeout(()=>{
            axios.post('/bundle/recommendations', {
            framework: this.props.options.frontEnd.framework,
            packages: this.props.tasks.currentTask.plugins
            })
            .then((response)=>{
              this.props.loadCf(response.data.map((suggestion)=>{
                return suggestion.name;
              }));
            })
            .catch((err)=>{
              console.log(err);
            })
          },0)
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
    currentTask: currentTask,
    loadCf: loadCf
  }, dispatch);
}



export default connect(mapStateToProps, matchDispatchToProps)(TaskButton);