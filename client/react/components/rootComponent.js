import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
    console.log(this.props.location.pathname)
  }

  componentWillReceiveProps() {
    if (this.props.options.user.userName) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  render() {

    var logButton;

    if ( this.props.location.pathname === '/' ) {
      if (this.state.isLoggedIn) {
        logButton = <NavItem eventKey={1} onClick={()=>{ logoutToGit(); }} >Logout</NavItem>
      } else {
        logButton = <NavItem eventKey={1} onClick={()=>{ loginToGit(); }} >Login</NavItem>
      }
    }

    return (
      <div>
        <Navbar>
          {this.props.location.pathname !== '/' ? <Navbar.Header><Navbar.Brand><Link to='/'>Stackbear</Link></Navbar.Brand></Navbar.Header> : null}
          <Nav pullRight>
            {this.state.isLoggedIn && <NavItem eventKey={0} onClick={()=>{browserHistory.push('/account')}}>Account</NavItem>}
            {logButton}
          </Nav>
          {this.props.options.user.userName ? <Navbar.Text pullRight>Welcome {this.props.options.user.userName}!</Navbar.Text> : null}
        </Navbar>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    tasks: state.display
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

function loginToGit() {
   window.location.assign('/auth/github');
}

function logoutToGit() {
   window.location.assign('/auth/logout');
}

export default connect(mapStateToProps, matchDispatchToProps)(Root);