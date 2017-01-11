import React from 'react';
import { Link } from 'react-router';

import { Button } from 'react-bootstrap';

class ButtonComponent extends React.Component {
	// constructor(props){
	// 	super(props)
	// }

	render() {
		return(
			<Link to={this.props.data.link}>
        <Button className='selector advanced' bsSize='large' >
          {this.props.data.name}
        </Button>
        <div className={'button-shadow button-shadow' + this.props.data.shadowType }></div>
      </Link>
		)
	}
}
export default ButtonComponent;