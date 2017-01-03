import React from 'react';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ProjectCart extends React.Component {
  render() {
    if(this.props.display.display === 'basic'){
      return (
        <Col
          xs={this.props.display.page.colSize}
          xsOffset={this.props.display.page.colOffset}
          >
          <ListGroup>
            <ListGroupItem active>{this.props.display.page.listTitle}</ListGroupItem>
            <ListGroupItem> Framework: {this.props.options.frontEnd.framework}</ListGroupItem>
            <ListGroupItem> Database: {this.props.options.backEnd.database}</ListGroupItem>
          </ListGroup>
        </Col>
      )
    }
    return (
       <Col
          xs={this.props.display.page.colSize}
          xsOffset={this.props.display.page.colOffset}
          >
          <ListGroup>
            <ListGroupItem active>{this.props.display.page.listTitle}</ListGroupItem>
            <ListGroupItem> Framework: {this.props.options.frontEnd.framework}</ListGroupItem>
            <ListGroupItem> Styling: {this.props.options.frontEnd.styling}</ListGroupItem>
            <ListGroupItem> Database: {this.props.options.backEnd.database}</ListGroupItem>
            <ListGroupItem> Task Runner: {this.props.options.devTools.taskRunner.name}</ListGroupItem>
            <ListGroupItem> Test Suite: {this.props.options.devTools.testing}</ListGroupItem>
          </ListGroup>
        </Col>
    )
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    display: state.display
  };
}

export default connect(mapStateToProps)(ProjectCart);