import React from 'react';
import { Link } from 'react-router';
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
      <Grid>
        <div className='guidedHeader'>
          <h4>Review your stack</h4>
        </div>
        {summaries.filter((summary, index)=>{
          return summary.name !== null;
        }).map((summary, index)=>{
          return(
            <SummaryRow summary={summary} key={index} type={summary.type}/>
          )
        })}
        {this.props.options.user.userName && <NameRepo/>}
        <div className='summaryButton'
          onClick={()=> setBundleId(this.props.options, this.props.bundleID || '')}>
         <NavButton button={summaryNav.build} />
        </div>
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
    console.log(response.data)
    cb(response.data);;
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