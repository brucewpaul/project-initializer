import React from 'react';
import { connect } from 'react-redux';


import { Nav, Navbar, Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class TestingCartView extends React.Component {
  render(){
    if(this.props.options.devTools.testing){
      return(
        <div>
          <h2>Test Suite</h2>
          <h4>{this.props.options.devTools.testing}</h4>
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

export default connect(mapStateToProps)(TestingCartView);