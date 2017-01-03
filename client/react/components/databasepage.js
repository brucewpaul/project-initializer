import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectDatabase, changeDisplayType, changeCheckoutFormat } from '../actions/index';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

import ProjectCart from './cartview';
import { cart } from '../actions/actionhelper';

class DatabasePage extends React.Component {

  componentDidMount() {
    this.props.changeCheckoutFormat(cart);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={8} className='choiceDirections'>
            <h4>Select a database </h4>
          </Col>
        </Row>
        <Row>
          <Col xs={4} className='selector'>
            <Button
              bsStyle='primary'
              onClick={()=> this.props.selectDatabase('MongoDB')}
              block>
              <h2>MongoDB</h2>
              <Image
                src = 'https://cms-assets.tutsplus.com/uploads/users/1116/posts/24835/preview_image/mongodb-logo.png'
                className="mongologo"></Image>
            </Button>
          </Col>
          <Col xs={4} className='selector'>
            <Button
              bsStyle='danger'
              onClick={()=> this.props.selectDatabase('Sqlite')}
              block>
              <h2>Sqlite</h2>
              <Image
              src = 'https://upload.wikimedia.org/wikipedia/commons/9/97/Sqlite-square-icon.svg'
              className="logo"></Image>
            </Button>
          </Col>
          <ProjectCart />
        </Row>
        <Row>
          <Col xs={4} xsOffset={2} className="choiceButtons">
            <Link to='/checkout'>
              <Button bsSize='large'>
               Checkout Page
              </Button>
            </Link>
          </Col>
          <Col xs={4} xsOffset={2} className="choiceButtons">
            <Link to='/checkout'>
              <Button bsSize='large'>
               Advanced Options
              </Button>
            </Link>
          </Col>
        </Row>
      </Grid>
    );
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
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DatabasePage);