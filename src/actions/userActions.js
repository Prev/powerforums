import {
    USER_DELETE_PENDING, USER_DELETE_FULFILLED, USER_DELETE_REJECTED,
    USER_LOGIN_PENDING, USER_LOGIN_FULFILLED, USER_LOGIN_REJECTED,
    USER_LOGOUT_PENDING, USER_LOGOUT_FULFILLED, USER_LOGOUT_REJECTED
} from "../constants/userActionTypes"
import { userListFetch } from "../actions/userListActions"

export const userLogin = (username, password) => (dispatch, getState, client) => {
    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(userLoginPending())

    client.login(username, password).then(response => {
        // When API call is successful.
        // Set authorization header in API HTTP middleware.
        client.setAuthorizationToken(response.token);

        // TODO: Save token on client

        // Dispatch a fulfilled action.
        dispatch(userLoginFulfilled(response))


    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(userLoginRejected(response))
    })
}

const userLoginPending = () => ({
    type: USER_LOGIN_PENDING
})

const userLoginFulfilled = data => ({
    type: USER_LOGIN_FULFILLED,
    payload: data
})

const userLoginRejected = data => ({
    type: USER_LOGIN_REJECTED,
    payload: data
})

export const userLogout = () => (dispatch, getState, client) => {
    dispatch(userLogoutPending())

    // TODO: Remove session on client or server

    dispatch(userLogoutFulfilled())
}

const userLogoutPending = () => ({
    type: USER_LOGOUT_PENDING
})

const userLogoutFulfilled = () => ({
    type: USER_LOGOUT_FULFILLED
})

export const userDelete = userId => (dispatch, getState, client) => {
    // We want to handle an Async action, dispatch a "Loading" action.
    dispatch(userDeletePending())

    client.deleteUser(userId).then(response => {
        // When API call is successful, dispatch a fulfilled action.
        dispatch(userDeleteFulfilled(response))
        dispatch(userListFetch())

    }).catch(response => {
        // When an error (network or applicative) occurs, dispatch a rejected action.
        dispatch(userDeleteRejected(response))
    })
}

const userDeletePending = () => ({
    type: USER_DELETE_PENDING
})

const userDeleteFulfilled = data => ({
    type: USER_DELETE_FULFILLED,
    payload: data
})

const userDeleteRejected = data => ({
    type: USER_DELETE_REJECTED,
    payload: data
})