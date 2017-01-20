import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectFramework } from '../../actions/index';

import { Grid, Row, Col } from 'react-bootstrap';

import { frontEnd } from '../../utils/selectorDesc';

import SelectorDiv from '../parts/selectorDiv';
import NavButton from '../parts/navButton';


class GuidedFrontend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: this.props.options.frontEnd.framework ? false : true,
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
          <h4>{frontEnd.header}</h4>
        </div>
        <Row>
          {frontEnd.selectors.map((selector, index)=>{
            return (
              <Col xs={selector.xs} xsOffset={selector.xsOffset} key={index}>
                <div onClick={this.haveSelected.bind(this)} key={index}>
                  <SelectorDiv selector={selector} choice={this.props.selectFramework.bind(this)} key={index}/>
                </div>
                <div className='description'>
                  <p>{selector.desc}</p>
                </div>
              </Col>
            )
          })}
        </Row>
        <Row className='navButtons'>
          {frontEnd.buttons.map((button, index)=>{
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
    selectFramework: selectFramework
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedFrontend);