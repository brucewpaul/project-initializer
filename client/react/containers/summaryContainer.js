import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectFramework, selectDatabase, taskRunner } from '../actions/index';

import FrontendSummary from '../components/frontendSummary';
import BackendSummary from '../components/backendSummary';

import SummaryRow from '../components/parts/summaryRow';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

import { selectionStatus } from '../utils/summaryDesc';


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
        <Link to='/download'>
          <Button className='summary-download-btn'>
            Build
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
    selectDatabase: selectDatabase,
    taskRunner: taskRunner,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SummaryContainer);