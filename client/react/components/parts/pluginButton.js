import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { Button } from 'react-bootstrap';
import { currentTask, changePlugins, loadCf } from '../../actions/index';


class PluginButton extends React.Component {

  render() {
    return (
      <Button
        onClick={()=>{
          if(!this.props.tasks.currentTask.plugins.includes(this.props.pluginName)){
            this.props.currentTask(addPlugin(this.props.tasks.currentTask, this.props.pluginName));
            axios.post('/bundle/recommendations', {
              framework: this.props.options.frontEnd.framework,
              packages: this.props.tasks.currentTask.plugins
              })
              .then((response)=>{
                this.props.loadCf(response.data.map((suggestion)=>{
                  return suggestion.name;
                }));
              })
              .catch((err)=>{
                console.log(err);
              })
          }

          if(!this.props.tasks.plugins.includes(this.props.pluginName)){
            this.props.changePlugins(addPlugin(this.props.tasks, this.props.pluginName).plugins);

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
    changePlugins: changePlugins,
    loadCf: loadCf
  }, dispatch);
}

function addPlugin(obj, pluginName){
  obj.plugins.push(pluginName)
    return obj;
}

export default connect(mapStateToProps, matchDispatchToProps)(PluginButton);

