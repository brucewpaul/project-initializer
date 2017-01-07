import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GuidedFrontend from '../components/guidedFrontend';
import GuidedHeader from '../components/guidedHeader';
import GuidedCartContainer from './guidedCartContainer';
import GuidedBackend from '../components/guidedBackend';
import GuidedTaskRunner from '../components/guidedTaskRunner';
import GuidedPlugins from '../components/guidedPlugins';
import GuidedTaskCreation from '../components/guidedTaskCreation';
import GuidedTesting from '../components/guidedTesting';

import { selectFramework, changeDisplayType, changeCheckoutFormat } from '../actions/index';


import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

class GuidedContainer extends React.Component {

  render() {
    if(this.props.display.page.name === 'frontend'){
      return (
        <div>
          <div className='cartView'>
            <GuidedCartContainer />
          </div>
          <div className='optionsView'>
            <GuidedHeader />
            <GuidedFrontend />
          </div>
        </div>
      )
    }
    if(this.props.display.page.name === 'backend'){
      return (
        <div>
          <div className='cartView'>
            <GuidedCartContainer />
          </div>
          <div className='optionsView'>
            <GuidedHeader />
            <GuidedBackend />
          </div>
        </div>
      )
    }
    // if(this.props.display.page.name === 'taskRunner'){
    //   return (
    //     <div>
    //       <div className='cartView'>
    //         <GuidedCartContainer />
    //       </div>
    //       <div className='optionsView'>
    //         <GuidedHeader />
    //         <GuidedTaskRunner />
    //       </div>
    //     </div>
    //   )
    // }
    // if(this.props.display.page.name === 'plugins'){
    //   return (
    //     <div>
    //       <div className='cartView'>
    //         <GuidedCartContainer />
    //       </div>
    //       <div className='optionsView'>
    //         <GuidedHeader />
    //         <GuidedPlugins />
    //       </div>
    //     </div>
    //   )
    // }
    // if(this.props.display.page.name === 'tasks'){
    //   return (
    //     <div>
    //       <div className='cartView'>
    //         <GuidedCartContainer />
    //       </div>
    //       <div className='optionsView'>
    //         <GuidedHeader />
    //         <GuidedTaskCreation />
    //       </div>
    //     </div>
    //   )
    // }
    // if(this.props.display.page.name === 'testing'){
    //   return (
    //     <div>
    //       <div className='cartView'>
    //         <GuidedCartContainer />
    //       </div>
    //       <div className='optionsView'>
    //         <GuidedHeader />
    //         <GuidedTesting />
    //       </div>
    //     </div>
    //   )
    // }
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
    changeDisplayType: changeDisplayType,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedContainer);