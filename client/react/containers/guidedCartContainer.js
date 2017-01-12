import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

class GuidedCart extends React.Component {

  render() {
    return(
      <div className='cart'>
        <div className='cartHeader'>
          <h4>Cart</h4>
        </div>
        <span> Front-end  {this.props.options.frontEnd.framework || ''}</span><br/>
          <span> Database {this.props.options.backEnd.database || ''}</span><br/>
          <span> Task Runner  {this.props.options.devTools.taskRunner.name || ''}</span><br/>
        <Link to='/checkout'>
          <Button>Build</Button>
        </Link>
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

export default connect(mapStateToProps)(GuidedCart);