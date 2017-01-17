import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Root extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Navbar>
          <Nav pullRight>
            <NavItem eventKey={1}
            onClick={()=>{
              console.log('login clicked');
              loginToGit();
            }}
            >Login</NavItem>
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

export default connect(mapStateToProps, matchDispatchToProps)(Root);