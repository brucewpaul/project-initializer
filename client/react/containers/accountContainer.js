import React from 'react';
import axios from 'axios';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import AccountCard from '../components/parts/accountCard.js';

class AccountContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBundles: []
    }
  }
  componentWillMount() {
    axios.get(`/bundle/${this.props.options.user.userName}`)
      .then(function(response) {
        this.setState({
          userBundles: response.data.slice()
        });
      }.bind(this))
      .catch(function(error) {
        console.log('err', error)
      });
  }
  render() {
    return(
      <Grid>
        {this.state.userBundles.map(function(bundle, index) {
          return <AccountCard key={index} bundleName={bundle}/>
        })}
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

export default connect(mapStateToProps)(AccountContainer);