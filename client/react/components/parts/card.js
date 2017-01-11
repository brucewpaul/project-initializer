import React from 'react';

import ButtonComponent from './buttonComponent';

class Card extends React.Component {
	// constructor(props){
	// 	super(props)
	// }

	render() {
		return(
			<div className ='button-description'>
				<h4>{this.props.card.name}</h4>
				<ul>
				{this.props.card.descriptions.map((desc, index)=>{
					return <li key={index}>{desc}</li>
				})}
				</ul>
				<ButtonComponent data = {this.props.card.button}/>
			</div>
		)
	}
}
export default Card;