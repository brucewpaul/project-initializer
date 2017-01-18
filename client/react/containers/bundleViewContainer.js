import React from 'react';
import { Grid, Row, Col, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import FileDirectory from '../components/projectview/fileDirectory.js';
import FileContentDisplay from '../components/projectview/fileContentDisplay.js';
import FileTabs from '../components/projectview/fileTabs.js';

class BundleViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bundleContents: [],
      currentFile: {},
      currentContents: '',
      tabs: [],
      activeTabKey: 0
    }
  }

  componentDidMount() {
    this.getDirectory();
  }

  setCurrentFile(currentFile) {
    if (this.state.currentFile) {
      this.setState({
        currentFile: currentFile,
        currentContents: currentFile.contents
      });
    } else {
      this.setState({ //change to first tab
        currentFile: tabs[0],
        currentContents: tabs[0].contents
      });
    }
  }

  addNewTab(file, callback) {
    var newTabs = this.state.tabs.slice();
    var canAdd = true;
    newTabs.forEach(function(tab, index) {
      if (tab.fileId === file.fileId) {
        canAdd = false;
      }
    });
    if (canAdd) {
      newTabs.push(file);
      this.setState({
        tabs: newTabs
      }, function() {
        callback();
      }.bind(this));
    } else {
      callback();
    }
  }

  setActiveTabFromTab(eventKey) {
    event.preventDefault();
    this.setState({
      activeTabKey: eventKey
    }, function() {
      this.setCurrentFile(this.state.tabs[eventKey]);
    }.bind(this));
  }

  setActiveTabFromFile(selectedFile) {
    this.state.tabs.forEach(function(tab, index) {
      if (tab.fileId === selectedFile.fileId) {
        console.log(index);
        this.setState({
          activeTabKey: index
        }, function() {
          // console.log(this.state.activeTabKey);
          this.setCurrentFile(this.state.tabs[index]);
        }.bind(this));
      }
    }.bind(this));
  }

  deleteTab(tabIdx) {
    var newTabs = this.state.tabs.slice();
    newTabs.splice(tabIdx, 1);
    this.setState({
      tabs: newTabs
    }, function() {
      console.log('state', this.state.tabs)
    });
  }

  getDirectory() {
    axios.get(`/bundle/contents/${this.props.options.bundleId}`)
    // axios.get(`/bundle/contents/stack-stork-59b888dd`)
      .then(function(response) {
        this.setState({
          bundleContents: response.data
        });
      }.bind(this))
      .catch(function(error) {
        console.log('err', error);
      });
  }

  render() {
    return(
      <Grid fluid>
        <Row className='directory-viewer'>
          <Col xs={3}>
            <div className='file-directory-wrap'>
              <FileDirectory
                setActiveTabFromFile={this.setActiveTabFromFile.bind(this)}
                addNewTab={this.addNewTab.bind(this)}
                setCurrentFile={this.setCurrentFile.bind(this)}
                directoryItems={this.state.bundleContents.children}/>
            </div>
          </Col>
          <Col xs={9}>
            <FileTabs
              activeTabKey={this.state.activeTabKey}
              setActiveTabFromTab={this.setActiveTabFromTab.bind(this)}
              setCurrentFile={this.setCurrentFile.bind(this)}
              tabs={this.state.tabs}
              deleteTab={this.deleteTab.bind(this)}/>
            <FileContentDisplay
              getDirectory={this.getDirectory.bind(this)}
              bundleId={this.props.options.bundleId}
              currentFile={this.state.currentFile}
              currentContents={this.state.currentContents}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    display: state.display
  };
}

export default connect(mapStateToProps)(BundleViewContainer);