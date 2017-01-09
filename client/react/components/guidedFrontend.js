import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { backend } from '../actions/actionhelper';
import { selectFramework, changeDisplayType, changeCheckoutFormat } from '../actions/index';

import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class GuidedFrontend extends React.Component {

  render() {
    return (
      <div>
        <Row>
          <div className='guidedButtons'>
            <Col xs={4}>
              <div className='guidedButton' onClick={()=> {
                  this.props.selectFramework('React');
                  }
                }
                >
                <div className='logo'>
                  <img src='images/react-logo@2x.png' />
                </div>
                <div className='title'>
                  <p>React</p>
                </div>
              </div>
            </Col>
            <Col xs={4}>
              <div className='guidedButton' onClick={()=> {
                  this.props.selectFramework('Angular');
                  }
                }
                >
                <div className='logo'>
                  <img src='images/angular-logo@2x.png' />
                </div>
                <div className='title'>
                  <p>Angular</p>
                </div>
              </div>
            </Col>
            <Col xs={4}>
              <div className='guidedButton' onClick={()=> {
                  this.props.selectFramework('Vue');
                  }
                }
                >
                <div className='logo'>
                  <img src='images/vue-logo@2x.png' />
                </div>
                <div className='title'>
                  <p>Vue</p>
                </div>
              </div>
            </Col>
          </div>
        </Row>
        <Row className='navButtons'>
          <Col className='navButton-wrap' xs={3}>
            <Link to='/' className='navButton prev'>
            <Button className='prevButton' bsSize='large'>
            Home
            </Button>
          </Link>
          </Col>
          <Col className='navButton-wrap' xs={3} xsOffset={6}>
            <Button
              bsSize='large'
              className='navButton next'
              onClick={()=>this.props.changeCheckoutFormat(backend)}
              >
              Next
            </Button>
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
    selectFramework: selectFramework,
    changeDisplayType: changeDisplayType,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedFrontend);