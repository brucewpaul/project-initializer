import React from 'react';

import CardButtonComponent from './cardButtonComponent';

class Card extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		return(
			<div className ='button-description'>
				<h4>{this.props.card.name}</h4>
				<ul>
				{this.props.card.descriptions.map((desc, index)=>{
					return <li key={index}>{desc}</li>
				})}
				</ul>
				<CardButtonComponent data = {this.props.card.button}/>
			</div>
		)
	}
}
export default Card;