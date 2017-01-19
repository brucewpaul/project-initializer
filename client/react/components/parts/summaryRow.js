import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectFramework, selectDatabase, taskRunner } from '../../actions/index';

import { Row, Col, Button, Image } from 'react-bootstrap';

class SummaryRow extends React.Component {
  render() {
    return (
      <Row className='summary-row'>
        <Col xs={4}>
          <div className='summary-image-wrap'>
            <Image src={this.props.summary.logo}></Image>
          </div>
        </Col>
        <Col xs={6}>
          <h4>{this.props.summary.name}</h4>
          <ul>
            <li>{this.props.summary.desc}</li>
          </ul>
        </Col>
        <Col xs={2}>
          <div className='summary-modify-wrap'>
            <Row>
              <i className="fa fa-trash" aria-hidden="true" onClick={()=> {
                if(this.props.type === 'frontEnd') {
                  this.props.selectFramework(null);
                }else if(this.props.type === 'backEnd') {
                  this.props.selectDatabase(null);
                } else if(this.props.type === 'taskRunner'){
                  this.props.taskRunner(null);
                }
              }}></i>
            </Row>
            <Row>
              <Link to={this.props.summary.choiceRoute}>
                <i
                 className='fa fa-pencil'
                    >
                </i>
              </Link>
            </Row>
          </div>
        </Col>
      </Row>
    )
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
    selectDatabase: selectDatabase,
    taskRunner: taskRunner
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SummaryRow);