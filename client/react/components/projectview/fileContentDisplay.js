import React from 'react';
import {Editor, EditorState, ContentState, convertToRaw} from 'draft-js';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import PrismDecorator from 'draft-js-prism';

class FileContentDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.decorator = new PrismDecorator();
    this.state = {
      editorState: EditorState.createEmpty(this.decorator)
    };
    this.onChange = (editorState) => this.setState({editorState});
  }
  componentWillUpdate(nextProps) {
    if (this.props.currentContents !== nextProps.currentContents) {
      this.setState({
        editorState: EditorState.createWithContent(ContentState.createFromText(nextProps.currentContents), this.decorator)
      });
    }
  }
  onSaveHandler() {
    axios.post(`/bundle/contents/${this.props.bundleId}`, {
      path: this.props.currentFile.path,
      content: this.state.editorState.getCurrentContent().getPlainText()
    })
    .then(function(response) {
      this.props.getDirectory();
    }.bind(this))
    .catch(function(error){
      console.log(error);
    });
  }
  render(){
    return (
      <div>
        <pre>
          <Editor editorState={this.state.editorState} onChange={this.onChange} />
        </pre>
        <Button onClick={this.onSaveHandler.bind(this)}>Save</Button>
      </div>
    )
  }
}

export default FileContentDisplay;
