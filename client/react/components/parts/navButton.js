import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

class NavButton extends React.Component {

  render() {
    return(
      <LinkContainer to={this.props.button.link}>
        <Button className={this.props.button.className}>
          {this.props.button.name}
        </Button>
      </LinkContainer>
    )
  }
}

export default NavButton;