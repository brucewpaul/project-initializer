import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectDatabase } from '../actions/index';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';


class DatabasePage extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} className='choiceDirections'>
            <h4>Select a database </h4>
          </Col>
        </Row>
        <Row>
          <Col xs={6} className='selector'>
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
          <Col xs={6} className='selector'>
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
        </Row>
        <Row>
          <Col xs={6} xsOffset={3} className="choiceButtons">
            <Link to='/checkout'>
              <Button bsSize='large'>
               Checkout Page
              </Button>
            </Link>
          </Col>
          <Col xs={6} xsOffset={3} className="choiceButtons">
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
    options: state.options
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectDatabase: selectDatabase
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DatabasePage);