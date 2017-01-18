import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

class NavButton extends React.Component {

  render() {
    return(
      <Link to={this.props.button.link} className={this.props.button.className}>
        <Button className='prevButton' bsSize='large'>
          {this.props.button.name}
        </Button>
      </Link>
    )
  }
}

export default NavButton;