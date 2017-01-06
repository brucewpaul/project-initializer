import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeDisplayType, changeCheckoutFormat } from '../actions/index';
import { Grid, Row, Col, Button, Image, Tabs, Tab, TabContainer, TabContent, TabPane} from 'react-bootstrap';

import ProjectCart from './cartview';
import FrameworkOptions from './frontendadvanced';
import DatabaseOptions from './databaseadvanced';
import TaskRunnerOptions from './taskrunneradvanced';
import { cart } from '../actions/actionhelper';

class AdvancedPage extends React.Component {
  componentDidMount() {
    this.props.changeCheckoutFormat(cart);
    this.props.changeDisplayType('advanced');
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={8} className='tabCol'>
            <Tabs defaultActiveKey={1}>
              <Tab eventKey={1} title='Frontend Frameworks' >
                <FrameworkOptions/>
              </Tab>
              <Tab eventKey={2} title='Database Options' >
                <DatabaseOptions/>
              </Tab>
              <Tab eventKey={3} title='Task Runner' >
                <TaskRunnerOptions/>
              </Tab>
              <Tab eventKey={4} title='Tasks' >
                <FrameworkOptions/>
              </Tab>
              <Tab eventKey={5} title='Testing' >
                Yes Plz
              </Tab>
            </Tabs>
          </Col>
           <ProjectCart />
        </Row>
        <Row>
          <Col xs={8} xsOffset={6} className='choiceButtons'>
            <Link to='/'>
             <Button bsSize='large'>
              Homepage Page
              </Button>
            </Link>
          </Col>
        </Row>
      </Grid>
    )
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
    changeDisplayType: changeDisplayType,
    changeCheckoutFormat: changeCheckoutFormat
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AdvancedPage);