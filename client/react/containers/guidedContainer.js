import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GuidedFrontend from '../components/guided/guidedFrontend';
import GuidedHeader from '../components/guided/guidedHeader';
import GuidedCartContainer from './guidedCartContainer';
import GuidedBackend from '../components/guided/guidedBackend';
import GuidedTaskRunner from '../components/guided/guidedTaskRunner';
import GuidedPlugins from '../components/guided/guidedPlugins';
import GuidedTaskCreation from '../components/guided/guidedTaskCreation';
import GuidedTesting from '../components/guided/guidedTesting';

import { selectFramework, changeDisplayType } from '../actions/index';


import { Grid, Row, Col, Button, Jumbotron, PageHeader, Image } from 'react-bootstrap';

    var cart = {
      header: 'Cart',
      button: {
        name:'build',
        color: '',
        link: ''
      }

    }

class GuidedContainer extends React.Component {

  render() {
    if(this.props.display.page.name === 'frontend'){
      return (
        <Grid>
          <div className='optionsView'>
            <GuidedHeader />
            <GuidedFrontend />
          </div>
        </Grid>
      )
    }
    if(this.props.display.page.name === 'backend'){
      return (
        <Grid>
          <div className='optionsView'>
            <GuidedHeader />
            <GuidedBackend />
          </div>
        </Grid>
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
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GuidedContainer);