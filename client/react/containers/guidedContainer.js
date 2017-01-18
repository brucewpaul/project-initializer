import React from 'react';
import GuidedCartContainer from './guidedCartContainer';
import { Grid, Row, Col } from 'react-bootstrap';

class GuidedContainer extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
        <GuidedCartContainer />
      </div>
    )
  }
}

export default GuidedContainer;