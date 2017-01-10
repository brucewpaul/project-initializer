import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class GuidedHeader extends React.Component {

  render() {
    return (
      <div className='guidedHeader'>
        <h4> Select a {this.props.display.page.listTitle}</h4>
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

export default connect(mapStateToProps)(GuidedHeader);
