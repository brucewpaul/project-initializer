import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectFramework, selectDatabase, taskRunner } from '../../actions/index';

import { Grid, Row, Col } from 'react-bootstrap';

import { frontEnd, backEnd, task, advanced } from '../../utils/selectorDesc';

import SelectorDiv from '../parts/selectorDiv';
import NavButton from '../parts/navButton';

class AdvancedSelection extends React.Component {

  render() {
    return(
      <div>
        <div className='guidedHeader'>
          <h4>{advanced.header}</h4>
        </div>
        <Row>
          {frontEnd.selectors.map((selector, index)=>{
            return (
              <Col xs={selector.xs} xsOffset={selector.xsOffset} key ={index}>
                <SelectorDiv selector={selector} choice={this.props.selectFramework.bind(this)} key={index}/>
              </Col>
            )
          })}
        </Row>
        <Row>
          {backEnd.selectors.map((selector, index)=>{
            return (
              <Col xs={selector.xs} xsOffset={selector.xsOffset} key ={index}>
                <SelectorDiv selector={selector} choice={this.props.selectDatabase.bind(this)} key={index}/>
              </Col>
            )
          })}
        </Row>
        <Row>
          {task.selectors.map((selector, index)=>{
            return (
              <Col xs={selector.xs} xsOffset={selector.xsOffset} key ={index}>
                <SelectorDiv selector={selector} choice={this.props.taskRunner.bind(this)} key={index}/>
              </Col>
            )
          })}
        </Row>
        <Row className='navButtons'>
          {advanced.buttons.map((button, index)=>{
            return (
              <Col xs={button.xs} xsOffset={button.xsOffset} key={index}>
                <NavButton button={button} key={index} />
              </Col>
            )
          })}
        </Row>
      </div>
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

export default connect(mapStateToProps, matchDispatchToProps)(AdvancedSelection);
