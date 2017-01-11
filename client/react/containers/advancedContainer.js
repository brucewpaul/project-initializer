import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GuidedCartContainer from './guidedCartContainer';
import { selectFramework, changeDisplayType } from '../actions/index';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class AdvancedContainer extends React.Component {
  render() {
    return(
      <div>
          <div className='cartView'>
            <GuidedCartContainer />
          </div>
          <div className='optionsView'>
          </div>
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
    changeDisplayType: changeDisplayType,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AdvancedContainer);