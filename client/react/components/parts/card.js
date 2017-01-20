import React from 'react';
import CardButtonComponent from './cardButtonComponent';

import { Col, Row } from 'react-bootstrap';

class Card extends React.Component {

  render() {
    return(
      <div className ='card-default button-description'>
        <h3>{this.props.card.name}</h3>
        <div className='desc-list'>
          <ul>
          {this.props.card.descriptions.map((desc, index)=>{
            return <li key={index}>{desc}</li>
          })}
          </ul>
        </div>
        <Row>
          <CardButtonComponent data={this.props.card.button}/>
        </Row>
      </div>
    )
  }
}
export default Card;