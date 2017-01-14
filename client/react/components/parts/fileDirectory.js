import React from 'react';
import FileDirectoryItem from './fileDirectoryItem.js'

class FileDirectory extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    if (this.props.directoryItems) {
      return (
        <ul>
          {this.props.directoryItems.map(function(item, index) {
            return <FileDirectoryItem setCurrentFile={this.props.setCurrentFile} content={item} key={index}/>
          }.bind(this))}
        </ul>
      )
    } else {
      return <ul></ul>
    }

  }
}

export default FileDirectory;