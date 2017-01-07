import React from 'react';
import { connect } from 'react-redux';


import { Nav, Navbar, Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class TaskRunnerCartView extends React.Component {
  render(){
    if(this.props.options.devTools.taskRunner.name){
      return(
        <div>
          <h2>Task Runner</h2>
          <h4>{this.props.options.devTools.taskRunner.name}</h4>
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

export default connect(mapStateToProps)(TaskRunnerCartView);