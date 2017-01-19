import React from 'react';
import { Col, Row } from 'react-bootstrap';

class AccountCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.bundle) {
      return (
        <Col xs={3}>
          <div className='account-card'>
            <h4>{this.props.bundle}</h4>
            <div className='fa-buttons'>
              <i onClick={()=>{this.props.downloadBundleHandler(this.props.bundle)}} className="fa fa-cloud-download" aria-hidden="true"></i>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              <i onClick={()=>{this.props.deleteBundleHandler(this.props.bundle)}} className="fa fa-trash" aria-hidden="true"></i>
            </div>
          </div>
        </Col>
      )
    } else {
      return <div></div>
    }

  }
}

export default AccountCard;