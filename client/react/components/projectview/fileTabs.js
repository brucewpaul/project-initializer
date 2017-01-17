import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';

class FileTabs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Nav bsStyle="tabs" activeKey={this.props.activeTabKey} onSelect={this.props.setActiveTabFromTab}>
        {this.props.tabs.map(function(tab, index) {
          return <NavItem eventKey={index} key={index}>{tab.name}</NavItem>
        }.bind(this))}
      </Nav>
    );
  }
}

export default FileTabs;