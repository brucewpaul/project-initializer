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
      container: {
        border: 'solid 2px #F2F2F2',
        backgroundColor: '#ffffff'
      },
      text: {
        color: '#babec5'
      }
    };

    if (isSelected) {
      styles.container.border = 'solid 2px #2ca01c';
      styles.container.backgroundColor = '#f2fff0';
      styles.text.color = '#2ca01c';
    }

    return styles;
  }
  render() {
    var styles = this.setSelectionStyle();
    return (
      <div>
        <div style={styles.container} className='guidedButton'
         onClick={()=> { this.props.choice(this.props.selector.payloadName);}}>
          <div className='logo'>
            <img src={this.props.selector.image2X} />
          </div>
          <div className='title'>
            <p style={styles.text}>{this.props.selector.name}</p>
          </div>
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

