import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { frontend, taskRunner } from '../../actions/actionhelper';
import { selectDatabase, changeDisplayType, changeGuidedPage } from '../../actions/index';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class GuidedBackend extends React.Component {

  render() {
    return (
      <div>
        <Row>
          <div className='guidedButtons'>
            <Col xs={4}>
              <div className='guidedButton' onClick={()=> {
                  this.props.selectDatabase('Mongo');
                  }
                }
                >
                <div className='logo'>
                  <img src='images/mongo-logo@2x.png' />
                </div>
                <div className='title'>
                  <p>MongoDB</p>
                </div>
              </div>
            </Col>
            <Col xs={4}>
              <div className='guidedButton' onClick={()=> {
                  this.props.selectDatabase('Sqlite');
                  }
                }
                >
                <div className='logo'>
                  <img src='images/sqlite-logo@2x.png' />
                </div>
                <div className='title'>
                  <p>SQLite3</p>
                </div>
              </div>
            </Col>
            <Col xs={4}>
              <div className='guidedButton' onClick={()=> {
                  this.props.selectDatabase('Mysql');
                  }
                }
                >
                <div className='logo'>
                  <img src='images/mysql-logo@2x.png' />
                </div>
                <div className='title'>
                  <p>MySQL</p>
                </div>
              </div>
            </Col>
          </div>
        </Row>
        <Row className='navButtons'>
          <Col className='navButton-wrap' xs={3}>
            <Button
              className='prevButton'
              onClick={()=> this.props.changeGuidedPage(frontend)}
              bsSize='large'>
              Back
            </Button>
          </Col>
          <Col className='navButton-wrap' xs={3} xsOffset={6}>
            <Link to='/checkout'>
              <Button
                bsSize='large'
                className='navButton next'
                >
                Next
              </Button>
            </Link>
          </Col>
        </Row>
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
    selectDatabase: selectDatabase,
    changeDisplayType: changeDisplayType,
    changeGuidedPage: changeGuidedPage
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedBackend);