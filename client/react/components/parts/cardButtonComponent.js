import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class ButtonComponent extends React.Component {

	render() {
		return(
			<Link to={this.props.data.link}>
        <Button className={this.props.data.className} bsSize='large' onClick={()=>{
          if (this.props.data.name === 'Download') {
            downloadBundle(this.props.options.bundleId);
          }
        }} >
          {this.props.data.name}
        </Button>
        <div className={'button-shadow button-shadow' + this.props.data.shadowType }></div>
      </Link>
		)
	}
}

function mapStateToProps(state) {
  return {
    options: state.options,
    display: state.display
  };
}

function downloadBundle(id) {
    window.location.assign('/bundle/' + id);
}


export default connect(mapStateToProps)(ButtonComponent);