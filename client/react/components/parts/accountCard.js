import React from 'react';
import { Grid } from 'react-bootstrap';

class AccountCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>{this.props.bundleName}</div>
    )
  }
}

export default AccountCard;