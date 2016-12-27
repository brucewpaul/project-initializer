import React from 'react';
import ReactDom from 'react-dom';

class Hello extends React.Component {
	render() {
		return (
			<div>
			<h1>Hello</h1>
			<h4> This is React</h4>
			</div>
			);
	}
}

ReactDom.render(<Hello />, document.getElementById('app'));