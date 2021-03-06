import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import queryString from 'querystring';
import LoginForm from './loginForm';
import Loading from '../../components/Loading';
import * as userActions from './actions';

class Login extends Component {
    render() {
        const { currentUser, loading, error, login } = this.props;

        if (currentUser === false && loading === false) {
            // If there user is not authenticated, show LoginForm
            return <LoginForm loginError={error} login={login} />;

        }else if (currentUser === false && loading === true) {
            // If authentication request is pending, return nothing.
            return <Loading />;

        }else {
            const parsed = queryString.parse(location.search.substr(1));
            const next = (parsed.next) ? decodeURIComponent(parsed.next) : '/';

            return <Redirect to={next} />;
        }
    }
}


const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    loading: state.login.loading,
    error: state.login.error,
});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => {
        dispatch(userActions.login(username, password));
    }
});

export default connect(mapStateToProps, mapDispatchToProps) (Login)