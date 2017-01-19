import React from 'react';
import { Col } from 'react-bootstrap';

class AccountCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Col xs={4}>
        <div className='account-card'>
          <h4>{this.props.bundle}</h4>
        </div>
      </Col>
    )
  }
}

export default AccountCard;