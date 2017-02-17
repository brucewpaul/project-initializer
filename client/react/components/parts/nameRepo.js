import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { projectName } from '../../actions/index';

import { Col, Row, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class NameRepo extends React.Component {
  render() {
      return (
        <form>
          <FormGroup>
            <ControlLabel>
              Enter your project name
            </ControlLabel>
            <FormControl
              type='text'
              value={this.props.options.user.projectName || ''}
              onChange={(e)=> {
                if (!e.target.value.includes(' ')) {
                  this.props.projectName(e.target.value)}
                }
              }
            />
          </FormGroup>
        </form>
      )
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
