import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  componentWillReceiveProps() {
    if (this.props.options.user.userName) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  render() {

    var button;

    if ( this.props.location.pathname === '/' ) {
      if (this.state.isLoggedIn) {
        button = <NavItem eventKey={1} onClick={()=>{ logoutToGit(); }} >Logout</NavItem>
      } else {
        button = <NavItem eventKey={1} onClick={()=>{ loginToGit(); }} >Login</NavItem>
      }
    }

    return (
      <div>
        <Navbar>
          <Nav pullRight>
            {this.props.options.user.userName ? <div>Welcome {this.props.options.user.userName}!</div> : null}
            {button}
          </Nav>
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