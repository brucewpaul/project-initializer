import React from 'react';
import GuidedCartContainer from './guidedCartContainer';
import { Grid, Row, Col } from 'react-bootstrap';

class AdvancedContainer extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
        <GuidedCartContainer />
      </div>
    )
  }
}

export default AdvancedContainer;