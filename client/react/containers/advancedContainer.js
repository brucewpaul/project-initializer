import React from 'react';
import GuidedCartContainer from './guidedCartContainer';
import { Grid, Row, Col } from 'react-bootstrap';

class AdvancedContainer extends React.Component {

  render() {
    return (
      <Grid>
        <Row>
          {this.props.children}
          <GuidedCartContainer />
        </Row>
      </Grid>
    )
  }
}

export default AdvancedContainer;