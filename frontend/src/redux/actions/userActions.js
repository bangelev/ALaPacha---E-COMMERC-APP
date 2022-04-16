import axios from 'axios'

import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    CLEAR_ERROR,
} from '../constants/userConstants'

export const loginUser = (email, password) => async(dispatch) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST })

        const config = {
            headers: { 'Content-Type': 'application/json' },
        }
        const { data } = await axios.post(
            '/api/v1/login', {
                email,
                password,
            },
            config
        )

        dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

// register user
export const registerUser = (userData) => async(dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST,
        })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // Must multipart/form-data because pictures
            },
        }

        const { data } = await axios.post('/api/v1/register', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

// load user
export const loadCurrentUser = () => async(dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST,
        })
        const { data } = await axios.get('/api/v1/profile')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const logoutUser = () => async(dispatch) => {
    try {
        await axios.get('/api/v1/logout')
        dispatch({ type: LOGOUT_USER_SUCCESS })
    } catch (error) {
        dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message })
    }
}

// update profile
export const updateProfile = (userData) => async(dispatch) => {
        try {
            dispatch({
                type: UPDATE_PROFILE_REQUEST,
            })

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data', // Must multipart/form-data because pictures
                },
            }

            const { data } = await axios.put('/api/v1/profile/update', userData, config)
            console.log('AFTER AXIOS REQ')
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: error.response.data.message,
            })
        }
    }
    // update profile
export const updatePassword = (passwords) => async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_PASSWORD_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.put(
            '/api/v1/password/update',
            passwords,
            config
        )

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const forgotPassword = (email) => async(dispatch) => {
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        console.log('ACTION')
        const { data } = await axios.post('/api/v1/password/forgot', email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
}

//reset password
export const resetPassword = (token, passwords) => async(dispatch) => {
    try {
        dispatch({
            type: NEW_PASSWORD_REQUEST,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        console.log('ACTION')
        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        )

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
}

// clear error
export const clearError = () => async(dispatch) => {
    console.log('CLEARING ERROR')
    dispatch({
        type: CLEAR_ERROR,
    })
}