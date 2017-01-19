import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectFramework } from '../../actions/index';

class SelectorDiv extends React.Component {
  setSelectionStyle() {
    var optionVals = [
      this.props.options.frontEnd.framework,
      this.props.options.backEnd.database,
      this.props.options.devTools.taskRunner.name,
    ];

    var isSelected = false;
    for (var i = 0; i < optionVals.length; i++) {
      if (optionVals[i] === this.props.selector.payloadName) {
        isSelected = true;
        break;
      }
    }

    var styles = {
      border: 'solid 2px #F2F2F2',
      backgroundColor: '#ffffff',
      color: '#babec5'
    };

    if (isSelected) {
      styles.border = 'solid 2px #2ca01c';
      styles.backgroundColor = '#f2fff0';
      styles.color = '#2ca01c';
    }

    return styles;
  }
  render() {
    return (
      <div style={this.setSelectionStyle()} className='guidedButton'
       onClick={()=> { this.props.choice(this.props.selector.payloadName);}}>
        <div className='logo'>
          <img src={this.props.selector.image2X} />
        </div>
        <div className='title'>
          <p>{this.props.selector.name}</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    display: state.display
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectFramework: selectFramework,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SelectorDiv);

