import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class GuidedHeader extends React.Component {

  render() {
    return <h4 className='guidedHeader'> Select A {this.props.display.page.listTitle}</h4>
  }
}

function mapStateToProps(state) {
  return {
    options: state.options,
    display: state.display
  };
}

export default connect(mapStateToProps)(GuidedHeader);
