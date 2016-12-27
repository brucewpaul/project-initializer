import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';


class Checkout extends React.Component {
	render() {
		return (
			<div>
				<h1>Checkout</h1>
				<h4> This is React</h4>
				<Link to='/'>To homepage</Link>
			</div>
			);
	}
}

export default Checkout;