import React from 'react';
import FileDirectory from './fileDirectory.js'

class FileDirectoryItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    if (this.props.content.children) {
      return (
        <li>
          {this.props.content.name}
          <FileDirectory directoryItems={this.props.content.children}/>
        </li>
      )
    }
    return (
      <li>{this.props.content.name}</li>
    )
  }
}

export default FileDirectoryItem;