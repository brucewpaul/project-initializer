import React from 'react';

class GuidedContainer extends React.Component {

  render() {
    return (
        <div>
            {this.props.children}
        </div>
    )
  }
}

export default GuidedContainer;