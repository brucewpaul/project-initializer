import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';


class Homepage extends React.Component {
	render() {
		return (
			<div>
				<h1>Homepage</h1>
				<h4> This is React</h4>
				<Link to='/server'>To server</Link>
			</div>
			);
	}
}

export default Homepage;