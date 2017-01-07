import React from 'react';
import { connect } from 'react-redux';


import { Nav, Navbar, Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class FrontendCartView extends React.Component {
  render(){
    if(this.props.options.frontEnd.framework){
      return(
        <div>
          <h2>Front-end</h2>
          <h4>{this.props.options.frontEnd.framework}</h4>
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

export default connect(mapStateToProps)(FrontendCartView);