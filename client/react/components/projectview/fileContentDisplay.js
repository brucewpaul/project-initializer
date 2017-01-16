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
  componentWillReceiveProps() {
    this.setState({
      editorState: EditorState.createWithContent(ContentState.createFromText(this.props.contents))
    });
  }
  onSaveHandler() {
    axios.post('/bundle/contents/stack-skunk-5999f325', {
      path: this.props.currentFile.path,
      content: this.state.editorState.getCurrentContent().getPlainText()
    })
    .then(function(response) {
      console.log(response);
    })
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