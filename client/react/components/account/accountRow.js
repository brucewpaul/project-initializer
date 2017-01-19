import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import AccountCard from './accountCard.js';

class AccountRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Row>
        {this.props.bundleRow.map(function(bundle, index) {
          return <AccountCard key={index} bundle={bundle}/>
        })}
      </Row>
    )
  }
}

export default AccountRow;