import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectFramework, changeDisplayType, changeCheckoutFormat } from '../actions/index';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

import ProjectCart from './cartview';
import { cart } from '../actions/actionhelper';

class AdvancedPage extends React.Component {
  componentDidMount() {
    this.props.changeCheckoutFormat(cart);
    this.props.changeDisplayType('advanced');
  }

  render() {
    return (
      <div>
        <ProjectCart />
        <Link to='/'>
          <Button bsSize='large'>
            Homepage Page
          </Button>
        </Link>
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
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AdvancedPage);