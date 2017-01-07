import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { selectFramework, changeDisplayType, changeCheckoutFormat } from '../actions/index';

import { frontend } from '../actions/actionhelper';

import { Grid, Row, Col, Button } from 'react-bootstrap';

class DownloadContainer extends React.Component {
  render() {
    return(
      <div>
        this is the download page
        <Grid>
          <Row>
            <Col xs={3}>
              <Button disabled>
                Upload to github
              </Button>
            </Col>
            <Col xs={3}>
              <Button
                bsSize='large'
                onClick={()=> sendOptionsToServer(this.props.options)}
              > Download File</Button>
            </Col>
            <Col xs={3}>
              <Button disabled>
                Save Stack
              </Button>
            </Col>
          </Row>
        </Grid>
        <Link to ='/'>
          <Button
            onClick={()=> this.props.changeCheckoutFormat(frontend)}>
            Home
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

function sendOptionsToServer(options) {
  axios.post('/build',options)
  .then((response)=>{
    window.location.assign('/bundle/' + response.data);
  }).catch((err)=>{
    console.log(err);
  })
}


export default connect(mapStateToProps, matchDispatchToProps)(DownloadContainer);