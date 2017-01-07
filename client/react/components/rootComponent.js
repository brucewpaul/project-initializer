import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Root extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Navbar>
          <Nav pullRight>
            <NavItem eventKey={1} disabled>Login</NavItem>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    )
  }
}

export default Root