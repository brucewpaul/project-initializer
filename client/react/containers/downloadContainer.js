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
      <div>
        this is the download page
        <Grid>
          <Row>
            <Col xs={3}>
              <div>
                <h4>Push to Github</h4>
                {githubDesc.description}<br/>
                <Button
                  bsSize='large'
                  disabled
                >Push</Button>
              </div>
            </Col>
            <Col xs={3}>
              <div>
                <h4>Download Zip</h4>
                {downloadDesc.description}<br/>
                <Button
                  bsSize='large'
                  onClick={()=> sendOptionsToServer(this.props.options)}
                >Download</Button>
              </div>
            </Col>
            <Col xs={3}>
              <div>
                <h4>Save the Stack</h4>
                {saveDesc.description}<br/>
                <Button
                  bsSize='large'
                  disabled
                >Save</Button>
              </div>
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