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
          return <AccountCard deleteBundleHandler={this.props.deleteBundleHandler} key={index} bundle={bundle}/>
        }.bind(this))}
      </Row>
    )
  }
}

export default AccountRow;