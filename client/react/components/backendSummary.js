import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { mongoDesc, sqliteDesc } from '../utils/descriptions';

import { backend } from '../actions/actionhelper';

import { selectDatabase, changeCheckoutFormat } from '../actions/index';


import { Row, Col, Button, Image } from 'react-bootstrap';



class BackendSummary extends React.Component {
  render() {
    if(this.props.options.backEnd.database ==='Mongo'){
      return(
        <Row className='summary-row'>
          <Col xs={2}>
            <div className='summary-image-wrap'>
              <Image src='images/mongo-logo.png'></Image> 
            </div>
          </Col>
          <Col xs={8}>
            <h4>{this.props.options.backEnd.database}</h4>
            <ul>
              <li>{mongoDesc.description}</li>
            </ul>
          </Col>
          <Col xs={2}>
            <div className='summary-modify-wrap'>
              <Row>
                <i className="fa fa-trash" aria-hidden="true" onClick={()=> this.props.selectDatabase(null)}></i>
              </Row>
              <Row>
                <Link to='/guided'>
                  <i
                  className='fa fa-pencil'
                  onClick={()=> this.props.changeCheckoutFormat(backend)}
                  >
                  </i>
                </Link>
              </Row>
            </div>
          </Col>
        </Row>
      )
    }
    if(this.props.options.backEnd.database ==='Sqlite'){
      return(
        <Row className='summary-row'>
          <Col xs={2}>
            <div className='summary-image-wrap'>
              <Image src='images/sqlite-logo.png'></Image> 
            </div>
          </Col>
          <Col xs={8}>
            <h4>{this.props.options.backEnd.database}</h4>
            <ul>
              <li>{sqliteDesc.description}</li>
            </ul>
          </Col>
          <Col xs={2}>
            <div className='summary-modify-wrap'>
              <Row>
                <i className="fa fa-trash" aria-hidden="true" onClick={()=> this.props.selectDatabase(null)}></i>
              </Row>
              <Row>
                <Link to='/guided'>
                  <i
                  className='fa fa-pencil'
                  onClick={()=> this.props.changeCheckoutFormat(backend)}
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
    selectDatabase: selectDatabase,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(BackendSummary);