import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Button, Col} from 'react-bootstrap';

class GuidedCart extends React.Component {

  render() {
    return(
      <Col xs={3} xsOffset={1} className='cart'>
        <div className='cartHeader'>
          <h4>Cart</h4>
        </div>
        <div className='line'></div>
        <span> Front-end </span> <span className='choiceWord'>{this.props.options.frontEnd.framework || ''}</span><br/>
          <span> Database {this.props.options.backEnd.database || ''}</span><br/>
          <span> Task Runner  {this.props.options.devTools.taskRunner.name || ''}</span><br/>
        <Link to='/checkout'>
          <Button className='cartButton'>Build</Button>
        </Link>
      </Col>
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