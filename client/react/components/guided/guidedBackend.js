import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectDatabase } from '../../actions/index';

import { Grid, Row, Col } from 'react-bootstrap';

import { backEnd } from '../../utils/selectorDesc';

import SelectorDiv from '../parts/selectorDiv';
import NavButton from '../parts/navButton';


class GuidedBackend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
    }
  }

  haveSelected() {
    this.setState({
      isDisabled: false
    });
  }

  render() {
    return (
      <Col xs={6} xsOffset={1}>
        <div className='guidedHeader'>
          <h4>{backEnd.header}</h4>
        </div>
        <Row>
          {backEnd.selectors.map((selector, index)=>{
            return (
              <Col xs={selector.xs} xsOffset={selector.xsOffset} key ={index}>
                <div onClick={this.haveSelected.bind(this)} key={index}>
                  <SelectorDiv selector={selector} choice={this.props.selectDatabase.bind(this)} key={index}/>
                </div>
              </Col>
            )
          })}
        </Row>
        <Row className='navButtons'>
          {backEnd.buttons.map((button, index)=>{
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
    selectDatabase: selectDatabase
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedBackend);