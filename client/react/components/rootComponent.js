import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Root extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  render() {

    if ( this.props.location.pathname === '/') {

      var isLoggedIn = this.props.options.username;

      var button = null;
      if ( isLoggedIn === undefined ) {
        button = <NavItem eventKey={1} onClick={()=>{ loginToGit(); }} >Login</NavItem>
      } else {
        button = <NavItem eventKey={1} onClick={()=>{ logoutToGit(); }} >Logout</NavItem>
      }

    }

    return (
      <div>
        <Navbar>
          <Nav pullRight>
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