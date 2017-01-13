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
            return <FileDirectoryItem content={item} key={index}/>
          })}
        </ul>
      )
    } else {
      return <ul></ul>
    }

  }
}

export default FileDirectory;