import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectFramework, changeDisplayType, changeCheckoutFormat } from '../actions/index';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';


class FrameworkOptions extends React.Component {
  componentDidMount() {

  }

  render() {
    return(
      <Grid>
        <Row>
          <Col xs={3} className='selector'>
            <Button
              bsStyle='primary'
              onClick={()=> this.props.selectFramework('React')}
              >
              <h2>React</h2>
              <Image src ="https://upload.wikimedia.org/wikipedia/commons/5/57/React.js_logo.svg" className="logo"></Image>
            </Button>
          </Col>
          <Col xs={3} className='selector'>
            <Button
              bsStyle='danger'
              onClick={()=> this.props.selectFramework('Angular')}
              >
              <h2>Angular</h2>
              <Image src ="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" className="logo"></Image>
            </Button>
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

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectFramework: selectFramework,
    changeDisplayType: changeDisplayType,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FrameworkOptions);