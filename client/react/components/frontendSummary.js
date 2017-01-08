import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { reactDesc, angularDesc } from '../utils/descriptions';
import { frontend } from '../actions/actionhelper';

import { selectFramework, changeCheckoutFormat } from '../actions/index';


import { Button, Image } from 'react-bootstrap';


class FrontendSummary extends React.Component {
  render() {
    if(this.props.options.frontEnd.framework ==='React'){
      return(
        <div>
        <Image src='https://s-media-cache-ak0.pinimg.com/236x/9e/b5/26/9eb526b177570ae3d06398e0b8922cae.jpg'></Image>
        <h5>{reactDesc.description}</h5>
        <Button
        onClick={()=> this.props.selectFramework(null)}
        >
          Remove
        </Button>
        <Link to='/guided'>
          <Button
          onClick={()=> this.props.changeCheckoutFormat(frontend)}
          >
            Update
          </Button>
        </Link>
        </div>
      )
    }
    if(this.props.options.frontEnd.framework ==='Angular'){
      return(
        <div>
        <Image src='https://s-media-cache-ak0.pinimg.com/236x/9e/b5/26/9eb526b177570ae3d06398e0b8922cae.jpg'></Image>
        <h5>{angularDesc.description}</h5>
        <Button
        onClick={()=> this.props.selectFramework(null)}
        >
          Remove
        </Button>
        <Link to='/guided'>
          <Button
          onClick={()=> this.props.changeCheckoutFormat(frontend)}
          >
            Update
          </Button>
        </Link>
        </div>
      )
    } else {
      return <div></div>
    }
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
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FrontendSummary);