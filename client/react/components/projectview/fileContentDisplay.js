import React from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';

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
  render(){
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    )
  }
}

export default FileContentDisplay;