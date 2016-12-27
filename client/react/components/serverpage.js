import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';


class Serverpage extends React.Component {
	render() {
		return (
			<div>
				<h1>Serverpage</h1>
				<h4> This is React</h4>
				<Link to='/checkout'>To checkout</Link>
			</div>
			);
	}
}

export default Serverpage;