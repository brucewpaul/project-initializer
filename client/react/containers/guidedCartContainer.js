import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Button, Row, Col} from 'react-bootstrap';

class GuidedCart extends React.Component {

  render() {
    return(
      <Col xs={3} xsOffset={1} className='cart'>
        <div className='cartHeader'>
          <h4>Cart</h4>
        </div>
        <div className='line'></div>
        {this.props.options.frontEnd.framework ? <span> Front-end <span className='choiceWord'>{this.props.options.frontEnd.framework}</span></span> : <span className="disabled"> Front-end </span> }<br/>
        <div className='line-low'></div>
        {this.props.options.backEnd.database ?  <span>Database <span className='choiceWord'>{this.props.options.backEnd.database}</span></span>: <span className="disabled">Database</span> }
        <div className='line-low'></div>
        {this.props.options.devTools.taskRunner.name ? <span>Task Runner <span className='choiceWord'> {this.props.options.devTools.taskRunner.name}</span></span> : <span className="disabled">Task Runner <span className='choiceWord'> {this.props.options.devTools.taskRunner.name}</span></span> }
        <Row>
          <LinkContainer to='/checkout'>
            <Button className={!this.props.options.devTools.taskRunner.name || !this.props.options.backEnd.database || !this.props.options.frontEnd.framework ? 'disabled cartButton' : 'cartButton'}>Build</Button>
          </LinkContainer>
        </Row>
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