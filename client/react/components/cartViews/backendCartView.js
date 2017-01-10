import React from 'react';
import { connect } from 'react-redux';


import { Nav, Navbar, Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class BackendCartView extends React.Component {
  render(){
    if(this.props.options.backEnd.database){
      return(
        <div>
          <h2>Back-end</h2>
          <h4>{this.props.options.backEnd.database}</h4>
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

export default connect(mapStateToProps)(BackendCartView);