import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import Card from '../components/parts/card';
import { userID, userName } from '../actions/index.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { home } from '../utils/cardsDesc';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

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

  componentWillReceiveProps() {
    if (this.props.options.user.userName) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  render() {
    return(
      <div>
        <Grid className='homepage-header' fluid>

          <img className='landing-logo' src="images/stackbearlogo.png"/>
          <h3><span>Stackbear</span> is a modular node.js application scaffolding tool.</h3>
        </Grid>
        <Grid className='container-wrapper'>
          <Row className='homeButtons'>
            <Col xs={8} xsOffset={2}>

              <Row>
                <Col xs={12} className="lead intro">
                  <p>Create a node.js application to start learning different aspects of full-stack development or just get started with some basic scaffolding.</p>
                  {this.state.isLoggedIn ? null : <div><p>Want to create a github repo when you're finished?</p><Button className='nav-button home-btn' onClick={()=>{ loginToGit(); }}><i className="fa fa-github" aria-hidden="true"></i> Login to Github</Button></div>}
                </Col>
              </Row>

              <Row className='flexbox-container'>
                {home.cards.map((card, index)=>{
                  return (
                    <Col xs={card.xs} xsOffset={card.xsOffset} key={index}>
                      <Card card={card} key={index}/>
                    </Col>
                  )
                })}
              </Row>

              <Row>
                <Col xs={12} className="lead home-footer">
                  <p>Stackbear is an open source project and contributions are welcome. Checkout the <a href="https://github.com/burly-bulls/project-initializer">github repo</a> to see how to get involved</p>
                </Col>
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

function loginToGit() {
   window.location.assign('/auth/github');
}

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);