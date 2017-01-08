import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { mongoDesc, sqliteDesc } from '../utils/descriptions';

import { backend } from '../actions/actionhelper';

import { selectDatabase, changeCheckoutFormat } from '../actions/index';


import { Button, Image } from 'react-bootstrap';



class BackendSummary extends React.Component {
  render() {
    if(this.props.options.backEnd.database ==='Mongo'){
      return(
        <div>
          <Image src='https://s-media-cache-ak0.pinimg.com/236x/9e/b5/26/9eb526b177570ae3d06398e0b8922cae.jpg'></Image>
          <h5>{mongoDesc.description}</h5>
        <Button
        onClick={()=> this.props.selectDatabase(null)}
        >
          Remove
        </Button>
        <Link to='/guided'>
          <Button
          onClick={()=> this.props.changeCheckoutFormat(backend)}
          >
            Update
          </Button>
        </Link>
        </div>
      )
    }
    if(this.props.options.backEnd.database ==='Sqlite'){
      return(
        <div>
          <Image src='https://s-media-cache-ak0.pinimg.com/236x/9e/b5/26/9eb526b177570ae3d06398e0b8922cae.jpg'></Image>
          <h5>{sqliteDesc.description}</h5>
          <Button
          onClick={()=> this.props.selectDatabase(null)}
          >
            Remove
          </Button>
          <Link to='/guided'>
            <Button
            onClick={()=> this.props.changeCheckoutFormat(backend)}
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
    selectDatabase: selectDatabase,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(BackendSummary);