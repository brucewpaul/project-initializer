import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectFramework } from '../../actions/index';

class SelectorDiv extends React.Component {

  render(){
    return (
      <div className='guidedButton'
       onClick={()=> {
          this.props.choice(this.props.selector.payloadName);
          console.log(this.props);
          }
        }
        >
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

