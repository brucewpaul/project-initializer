import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { reactDesc, angularDesc } from '../utils/descriptions';
import { frontend } from '../actions/actionhelper';

import { selectFramework, changeCheckoutFormat } from '../actions/index';


import { Row, Col, Button, Image } from 'react-bootstrap';


class FrontendSummary extends React.Component {
  render() {
    if(this.props.options.frontEnd.framework ==='React'){
      return(
        <Row className='summary-row'>
          <Col xs={2}>
            <div className='summary-image-wrap'>
              <Image src='images/react-logo.png'></Image>
            </div>
          </Col>
          <Col xs={8}>
            <h4>{this.props.options.frontEnd.framework}</h4>
            <ul>
              <li>{reactDesc.description}</li>
            </ul>
          </Col>
          <Col xs={2}>
            <div className='summary-modify-wrap'>
              <Row>
                <i className="fa fa-trash" aria-hidden="true" onClick={()=> this.props.selectFramework(null)}></i>
              </Row>
              <Row>
                <Link to='/guided'>
                  <i
                  className='fa fa-pencil'
                  onClick={()=> this.props.changeCheckoutFormat(frontend)}
                  >
                  </i>
                </Link>
              </Row>
            </div>
          </Col>
        </Row>
      )
    }
    if(this.props.options.frontEnd.framework ==='Angular'){
      return(
        <Row className='summary-row'>
          <Col xs={2}>
            <div className='summary-image-wrap'>
              <Image src='images/angular-logo.png'></Image>
            </div>
          </Col>
          <Col xs={8}>
            <h4>{this.props.options.frontEnd.framework}</h4>
            <ul>
              <li>{angularDesc.description}</li>
            </ul>
          </Col>
          <Col xs={2}>
            <div className='summary-modify-wrap'>
              <Row>
                <i className="fa fa-trash" aria-hidden="true" onClick={()=> this.props.selectFramework(null)}></i>
              </Row>
              <Row>
                <Link to='/guided'>
                  <i
                  className='fa fa-pencil'
                  onClick={()=> this.props.changeCheckoutFormat(frontend)}
                  >
                  </i>
                </Link>
              </Row>
            </div>
          </Col>
        </Row>
      )
    } else {
      return <div></div>
    }
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    display: state.display
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectFramework: selectFramework,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FrontendSummary);