import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { projectName } from '../../actions/index';

import {  FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class NameRepo extends React.Component {
  render() {
    if(this.props.options.user.userId){
      return (
        <form>
          <FormGroup>
            <ControlLabel>
              Enter your project name
              {this.props.options.user.projectName}
            </ControlLabel>
            <FormControl
              type='text'
              value={this.props.options.user.projectName || ''}
              onChange={(e)=> this.props.projectName(e.target.value)}
            />
          </FormGroup>
        </form>
      )
    } else {
      return <div></div>
    }
  }

}

function mapStateToProps(state) {
  return {
    options: state.options,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    projectName: projectName
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NameRepo);
