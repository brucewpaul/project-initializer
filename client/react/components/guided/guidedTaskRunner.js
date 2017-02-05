import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { taskRunner } from '../../actions/index';

import { Grid, Row, Col } from 'react-bootstrap';

import { task } from '../../utils/selectorDesc';

import SelectorDiv from '../parts/selectorDiv';
import NavButton from '../parts/navButton';


class GuidedTaskRunner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: this.props.options.devTools.taskRunner.name ? false : true,
    }
  }

  componentWillMount() {
    if ( !this.props.options.backEnd.database ) {
      browserHistory.push('/');
    }
  }

  haveSelected() {
    this.setState({
      isDisabled: false
    });
  }

  render() {
    return (
      <Col xs={8}>
        <div className='guidedHeader'>
          <h4>{task.header}</h4>
        </div>
        <Row>
          {task.selectors.map((selector, index)=>{
            return (
              <Col xs={selector.xs} xsOffset={selector.xsOffset} key={index}>
                <div onClick={this.haveSelected.bind(this)} key={index}>
                  <SelectorDiv selector={selector} choice={this.props.taskRunner.bind(this)} key={index}/>
                </div>
                <div className='description'>
                  <p>{selector.desc}</p>
                </div>
              </Col>
            )
          })}
        </Row>
        <Row className='navButtons'>
          {task.buttons.map((button, index)=>{
            if ( button.name === 'Next' && this.state.isDisabled ) {

            } else {
              return (
                <Col xs={button.xs} xsOffset={button.xsOffset} key={index}>
                  <NavButton button={button} key={index} />
                </Col>
              )
            }
          })}
        </Row>
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

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    taskRunner: taskRunner
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedTaskRunner);