import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';
import { currentTask} from '../../actions/index';


class PluginButton extends React.Component {

  render() {
    return (
      <Button
        onClick={()=>{
          this.props.currentTask(addPlugin(this.props.tasks.currentTask, this.props.pluginName))
        }}
      >
      {this.props.pluginName}
      </Button>
    )
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    tasks: state.display
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    currentTask:currentTask
  }, dispatch);
}

function addPlugin(obj, pluginName){
  obj.plugins.push(pluginName)
    return obj;
}

export default connect(mapStateToProps, matchDispatchToProps)(PluginButton);

