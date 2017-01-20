import React, { Component } from 'react';
import ListItem from './ListItem.jsx';

class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='list-wrapper'>
        <ul>
          {this.props.listItems.map(function(listItem, index) {
            return <ListItem content={listItem} key={index}/>
          })}
        </ul>
      </div>
    );
  }
}

export default List;