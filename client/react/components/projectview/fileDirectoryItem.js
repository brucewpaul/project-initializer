import React from 'react';
import FileDirectory from './fileDirectory.js'

class FileDirectoryItem extends React.Component {
  constructor(props) {
    super(props);
  }
  onClickHandler() {
    this.props.setCurrentFile(this.props.content);
    this.props.addNewTab(this.props.content, function() {
      this.props.setActiveTabFromFile(this.props.content);
    }.bind(this));
  }
  render(){
    if (this.props.content.children) {
      return (
        <li>
          <i className="fa fa-folder" aria-hidden="true"></i>
          {this.props.content.name}
          <FileDirectory
            addNewTab={this.props.addNewTab}
            directoryItems={this.props.content.children}
            setCurrentFile={this.props.setCurrentFile}
            setActiveTabFromFile={this.props.setActiveTabFromFile}/>
        </li>
      )
    }
    return (
      <li onClick={this.onClickHandler.bind(this)}><i className="fa fa-file-text" aria-hidden="true"></i>{this.props.content.name}</li>
    )
  }
}

export default FileDirectoryItem;