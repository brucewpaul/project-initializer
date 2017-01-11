import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectFramework } from '../../actions/index';

import { Grid, Row, Col } from 'react-bootstrap';

import { frontEnd } from '../../utils/selectorDesc';

import SelectorDiv from '../parts/selectorDiv';
import NavButton from '../parts/navButton';


class GuidedFrontend extends React.Component {

  render() {
    return (
      <div>
        <div className='guidedHeader'>
          <h4>{frontEnd.header}</h4>
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
        <Row className='navButtons'>
          {frontEnd.buttons.map((button, index)=>{
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
    selectFramework: selectFramework
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedFrontend);