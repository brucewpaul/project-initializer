import React from 'react';
import { connect } from 'react-redux';


import { Nav, Navbar, Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class TasksCartView extends React.Component {
  render(){
    if(this.props.options.devTools.taskRunner.tasks.length > 0){
      var tasksNames = this.props.options.devTools.taskRunner.tasks.map(function(task){
        return <h4>{task.name}</h4>;
      })
      return(
        <div>
          <h2>Task Runner</h2>
          <h4>{tasksNames}</h4>
        </div>
      )
    }
    return <div></div>
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    display: state.display
  };
}

export default connect(mapStateToProps)(TasksCartView);