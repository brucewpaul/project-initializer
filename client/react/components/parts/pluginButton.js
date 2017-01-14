import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';
import { changePlugins } from '../../actions/index';


class PluginButton extends React.Component {

  render() {
    return (
      <Button
        onClick={()=>{
          this.props.changePlugins(addPlugin(this.props.tasks.plugins, this.props.pluginName))
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
    changePlugins: changePlugins
  }, dispatch);
}

function addPlugin(obj, pluginName){
  if(obj[pluginName]){
    obj[pluginName] = obj[pluginName] === '' ? pluginName : '';
  }
  else{
    obj[pluginName] = pluginName;
  }
    return obj;
}

export default connect(mapStateToProps, matchDispatchToProps)(PluginButton);

