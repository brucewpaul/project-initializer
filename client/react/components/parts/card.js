import React from 'react';
import CardButtonComponent from './cardButtonComponent';

import { Col } from 'react-bootstrap';

class Card extends React.Component {

  render() {
    return(
      <Col className ='button-description'>
        <h4>{this.props.card.name}</h4>
        <div className='desc-list'>
          <ul>
          {this.props.card.descriptions.map((desc, index)=>{
            return <li key={index}>{desc}</li>
          })}
          </ul>
        </div>
        <CardButtonComponent data = {this.props.card.button}/>
      </Col>
    )
  }
}
export default Card;