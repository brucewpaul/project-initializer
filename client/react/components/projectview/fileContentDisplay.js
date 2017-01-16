import React from 'react';
import {Editor, EditorState, ContentState, convertToRaw} from 'draft-js';
import {Button} from 'react-bootstrap';
import axios from 'axios';

class FileContentDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({editorState});
  }
  componentWillUpdate(nextProps) {
    if (this.props.contents !== nextProps.contents) {
      this.setState({
        editorState: EditorState.createWithContent(ContentState.createFromText(nextProps.contents))
      });
    }
  }
  onSaveHandler() {
    axios.post('/bundle/contents/stack-stork-59b888dd', {
      path: this.props.currentFile.path,
      content: this.state.editorState.getCurrentContent().getPlainText()
    })
    .then(function(response) {
      console.log(response);
      this.props.getDirectory();
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
  }
  render(){
    return (
      <div>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
        <Button onClick={this.onSaveHandler.bind(this)}>Save</Button>
      </div>
    )
  }
}

export default FileContentDisplay;