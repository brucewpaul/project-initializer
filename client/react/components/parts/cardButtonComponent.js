import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class ButtonComponent extends React.Component {

	render() {
		return(
			<LinkContainer to={this.props.data.link}>
        <Button className={this.props.data.className} bsSize='large' onClick={()=>{
          if (this.props.data.name === 'Download') {
            downloadBundle(this.props.options.bundleId);
          } else if (this.props.data.name === 'Push') {
            push(this.props.options);
          }
        }} >
          {this.props.data.name}
        </Button>
      </LinkContainer>
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

function push(options) {
  axios.post('/auth/push', options)
  .then(function(response) {
    setTimeout(
      function(){
        window.location.assign(response.data);
      }
      , 2000
    );
  })
  .catch(function(error) {
    console.log('fail', error);
  })
}



export default connect(mapStateToProps)(ButtonComponent);