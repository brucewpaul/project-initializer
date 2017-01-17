import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';
import { currentTask, changePlugins} from '../../actions/index';


class PluginButton extends React.Component {

  render() {
    return (
      <Button
        onClick={()=>{
          if(!this.props.tasks.currentTask.plugins.includes(this.props.pluginName)){
            this.props.currentTask(addPlugin(this.props.tasks.currentTask, this.props.pluginName));
          }

          if(!this.props.tasks.plugins.includes(this.props.pluginName)){
            this.props.changePlugins(addPlugin(this.props.tasks, this.props.pluginName).plugins);
            console.log(this.props.tasks.plugins);
          }
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
    currentTask:currentTask,
    changePlugins: changePlugins
  }, dispatch);
}

function addPlugin(obj, pluginName){
  obj.plugins.push(pluginName)
    return obj;
}

export default connect(mapStateToProps, matchDispatchToProps)(PluginButton);

