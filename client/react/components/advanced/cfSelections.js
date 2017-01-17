import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadCf } from '../../actions/index';


import { Grid, Row, Col } from 'react-bootstrap';

import PluginButton from '../parts/pluginButton';

class CFselections extends React.Component {

  componentDidMount(){
    axios.post('/bundle/recommendations', {
      framework: this.props.options.frontEnd.framework,
      packages: []
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

  render() {
    return(
      <div >
      Suggested Plugins <br/>
        {this.props.tasks.cf.map((suggestion, index)=>{
          return(
            <PluginButton pluginName={suggestion} key={index}/>
          )
        })}
      </div>
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
    loadCf: loadCf
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CFselections);
