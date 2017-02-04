import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { bundleID } from '../actions/index';
import SummaryRow from '../components/parts/summaryRow';
import NavButton from '../components/parts/navButton';
import NameRepo from '../components/parts/nameRepo';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';
import { selectionStatus, summaryNav } from '../utils/summaryDesc';


class SummaryContainer extends React.Component {

  render() {
    var summaries = selectionStatus(this.props.options).summaries;
    return(
      <Grid className='container-wrapper'>
        <Row>
          <Col xs={8}>
            <Row>
              <Col xs={12} className='guidedHeader'>
                <h4>Review your stack</h4>
              </Col>
            </Row>
            {summaries.filter((summary, index)=>{
              return summary.name !== null;
            }).map((summary, index)=>{
              return(
                <SummaryRow summary={summary} key={index} type={summary.type}/>
              )
            })}
          </Col>
          <Col xs={3} xsOffset={1}>
            <div className='guidedHeader'>
              <h4>When You're Ready</h4>
            </div>

            {this.props.options.user.userName && <NameRepo/>}

            <div className='summaryButton'
                  onClick={()=> setBundleId(this.props.options, this.props.bundleID || '')}>
                  <Button className='nav-button navButton3'>
                    Build
                  </Button>
            </div>
          </Col>
        </Row>
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

function setBundleId(options, cb) {
  axios.post('/bundle/build',options)
  .then((response)=>{
    console.log(response.data);
    cb(response.data);
    browserHistory.push('/download');
  }).catch((err)=>{
    console.log(err);
  })
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    bundleID: bundleID
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SummaryContainer);