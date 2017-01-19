import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Card from '../components/parts/card';
import { userID, userName } from '../actions/index.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { home } from '../utils/cardsDesc';

class HomePage extends React.Component {

  componentWillMount() {

    axios.get('/auth/me')
      .then((response) => {
        if ( response.data.username !== undefined) {
          this.props.userName(response.data.username)
          this.props.userID(response.data.id)
        }
      })
      .catch(function(error) {
        console.log('err', error);
      });
  }

  render() {
    return(
      <div>
        <Grid className='homepage-header' fluid>
          <h3><span>Stackbear</span> is a modular node.js application scaffolding tool.</h3>
        </Grid>
        <Grid className='container-wrapper'>
          <Row className='homeButtons'>
            <Col xs={8} xsOffset={2}>
              <Row className='flexbox-container'>
                {home.cards.map((card, index)=>{
                  return (
                    <Col xs={card.xs} xsOffset={card.xsOffset} key={index}>
                      <Card card={card} key={index}/>
                    </Col>
                  )
                })}
              </Row>
            </Col>
          </Row>
        </Grid>
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
    userID: userID,
    userName: userName
  }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(HomePage);