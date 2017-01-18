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
    if ( this.props.location.pathname === '/' ) {
      if ( this.props.options.user.userName) {
        this.setState({
          isLoggedIn: true
        });
      }
    }
  }

  render() {

    return (
      <div>
        <Navbar>
          <Nav pullRight>
            {this.state.isLoggedIn ? <NavItem eventKey={1} onClick={()=>{ logoutToGit(); }} >Logout</NavItem> : <NavItem eventKey={1} onClick={()=>{ loginToGit(); }} >Login</NavItem> }
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