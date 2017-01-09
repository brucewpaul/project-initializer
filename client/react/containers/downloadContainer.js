import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { selectFramework, changeDisplayType, changeCheckoutFormat } from '../actions/index';

import { frontend } from '../actions/actionhelper';
import { githubDesc, downloadDesc, saveDesc } from '../utils/descriptions'
;
import { Grid, Row, Col, Button } from 'react-bootstrap';

class DownloadContainer extends React.Component {
  render() {
    return(
      <Grid>
        <div className='guidedHeader'>
          <h4>Your stack has been created</h4>
        </div>

        <Row className='homeButtons'>
          <Col xs={4}>
            <div className='button-description'>
              <h4>Push to Github</h4>
              <ul>
                <li>Coming soon!</li>
                <li>Push your application to Github.</li>
              </ul>
            </div>
            <Button className='selector advanced' bsSize='large' disabled>
              Push
            </Button>
            <div className='button-shadow final-page button-shadow-advanced'></div>
          </Col>
          <Col xs={4}>
            <div className='button-description'>
              <h4>Download ZIP</h4>
              <ul>
                <li>Download your project.</li>
              </ul>
            </div>
            <Button onClick={()=> sendOptionsToServer(this.props.options)} className='selector guided' bsSize='large'>
              Download
            </Button>
            <div className='button-shadow final-page button-shadow-guided'></div>
          </Col>
          <Col xs={4}>
            <div className='button-description'>
              <h4>Save the Stack</h4>
              <ul>
                <li>Coming soon!</li>
                <li>Save the stack to your account.</li>
              </ul>
            </div>
              <Button onClick={()=> this.props.changeCheckoutFormat(frontend)} className='selector advanced' bsSize='large' disabled>
                Save
              </Button>
              <div className='button-shadow final-page button-shadow-advanced'></div>
          </Col>
        </Row>
        <Link to ='/'>
          <Button
            className='final-nav-btn'
            onClick={()=> this.props.changeCheckoutFormat(frontend)}>
            Home
          </Button>
        </Link>
      </Grid>
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

function sendOptionsToServer(options) {
  axios.post('/build',options)
  .then((response)=>{
    window.location.assign('/bundle/' + response.data);
  }).catch((err)=>{
    console.log(err);
  })
}


export default connect(mapStateToProps, matchDispatchToProps)(DownloadContainer);