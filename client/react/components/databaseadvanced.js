import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectDatabase, selectFramework, changeDisplayType, changeCheckoutFormat } from '../actions/index';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class DatabaseOptions extends React.Component {

	render() {
    return(
      <Grid>
        <Row>
          <Col xs={3} className='selector'>
            <Button
              bsStyle='primary'
              onClick={()=> this.props.selectDatabase('Mongo')}
              block>
              <h2>MongoDB</h2>
              <Image
                src = 'https://cms-assets.tutsplus.com/uploads/users/1116/posts/24835/preview_image/mongodb-logo.png'
                className="mongologo"></Image>
            </Button>
          </Col>
          <Col xs={3} className='selector'>
            <Button
              bsStyle='danger'
              onClick={()=> this.props.selectDatabase('Sqlite')}
              block>
              <h2>Sqlite</h2>
              <Image
              src = 'https://upload.wikimedia.org/wikipedia/commons/9/97/Sqlite-square-icon.svg'
              className="logo"></Image>
            </Button>
          </Col>        </Row>
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
    selectDatabase: selectDatabase,
    changeDisplayType: changeDisplayType,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DatabaseOptions);