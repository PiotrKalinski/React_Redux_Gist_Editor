import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticate } from '../actions/auth';
import * as authStates from '../consts/auth-states';
import App from './App';
import Loading from '../components/Loading';
import Login from '../components/Login';
class Entry extends React.Component {

    componentWillMount() {
        this.props.authenticate();
    }

    getComponentByAuth(){
    const { auth } = this.props;
    switch (auth.state) {
      case authStates.STARTED:
        return <Loading />;
      case authStates.LOGGED:
        return <App />;
      default:
        return <Login />;
    }
  };

  render() {
    return (
      <div>
        {this.getComponentByAuth()}
      </div>
    );
  }
};


export default connect(
  ({ auth }) => ({ auth }),
  (dispatch) => ({
    authenticate: bindActionCreators(authenticate, dispatch)
  })
)(Entry);
