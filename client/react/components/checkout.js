import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';


class Checkout extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={6} xsOffset={3}>
            <ListGroup>
              <ListGroupItem active>Project Details</ListGroupItem>
              <ListGroupItem> Framework: {this.props.options.frontEnd.framework}</ListGroupItem>
              <ListGroupItem> CSS styling: {this.props.options.frontEnd.styling}</ListGroupItem>
              <ListGroupItem> Database: {this.props.options.backEnd.database}</ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6} xsOffset={3} className="choiceButtons">
            <Link to='/'>
              <Button bsSize='large'>
               Homepage Page
              </Button>
            </Link>
          </Col>
          <Col xs={6} xsOffset={3} className="choiceButtons">
            <Link to='/'>
              <Button bsSize='large'>
               Advanced Options
              </Button>
            </Link>
          </Col>
          <Col xs={6} xsOffset={3} className="choiceButtons">
            <Button
              bsSize='large'
              onClick={() => console.log(this.props.options)}>
              Download Project
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    options: state.options
  };
}

export default connect(mapStateToProps)(Checkout);