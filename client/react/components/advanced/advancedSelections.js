import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectFramework, selectDatabase, taskRunner } from '../../actions/index';

import { Grid, Row, Col } from 'react-bootstrap';

import { frontEnd, backEnd, task, advanced } from '../../utils/selectorDesc';

import SelectorDiv from '../parts/selectorDiv';
import NavButton from '../parts/navButton';

class AdvancedSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frontEndSelected: false,
      backEndSelected: false,
      taskSelected: false,
    }
  }

  haveSelectedFrontEnd() {
    this.setState({
      frontEndSelected: true
    });
  }

  haveSelectedBackEnd() {
    this.setState({
      backEndSelected: true
    });
  }

  haveSelectedTask() {
    this.setState({
      taskSelected: true
    });
  }

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
                <div onClick={this.haveSelectedFrontEnd.bind(this)} key={index}>
                  <SelectorDiv selector={selector} choice={this.props.selectFramework.bind(this)} key={index}/>
                </div>
              </Col>
            )
          })}
        </Row>
        <Row>
          {backEnd.selectors.map((selector, index)=>{
            return (
              <Col xs={selector.xs} xsOffset={selector.xsOffset} key ={index}>
                <div onClick={this.haveSelectedBackEnd.bind(this)} key={index}>
                  <SelectorDiv selector={selector} choice={this.props.selectDatabase.bind(this)} key={index}/>
                </div>
              </Col>
            )
          })}
        </Row>
        <Row>
          {task.selectors.map((selector, index)=>{
            return (
              <Col xs={selector.xs} xsOffset={selector.xsOffset} key ={index}>
                <div onClick={this.haveSelectedTask.bind(this)} key={index}>
                  <SelectorDiv selector={selector} choice={this.props.taskRunner.bind(this)} key={index}/>
                </div>
              </Col>
            )
          })}
        </Row>
        <Row className='navButtons'>
          {advanced.buttons.map((button, index)=>{
            console.log(button)
            if ( button.name === 'Next' && (!this.state.frontEndSelected || !this.state.backEndSelected || !this.state.taskSelected) ) {
            } else {
              return (
                <Col xs={button.xs} xsOffset={button.xsOffset} key={index}>
                  <NavButton button={button} key={index} />
                </Col>
              )
            }
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
