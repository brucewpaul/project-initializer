import React from 'react';
import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class Root extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
			  <PageHeader className='projectTitle'>
          Project-Initializer<br/>
          <small>Your dream project is a click away</small>
        </PageHeader>
				{this.props.children}
			</div>
		)
	}
}

export default Root