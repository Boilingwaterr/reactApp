import { authAPI, profileAPI, securityAPI } from './../api/api';

const SET_USER_AUTH_DATA = 'auth/SET_USER_AUTH_DATA';
const SET_AUTH_ERROR = 'auth/SET_AUTH_ERROR';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';

let initialstate = {
    captchaURL: null,
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    myData: null,
    authError: null
}

let authReducer = (state = initialstate, action) => {
    switch (action.type) {
        case SET_USER_AUTH_DATA:
            return {
                ...state,
                ...action.data,
            }
        case SET_AUTH_ERROR:
            return {
                ...state,
                authError: action.data,
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaURL: action.data
            }
        default:
            return state;
    }
}

//ACTION CREATORS
export const getCaptchaURLSuccess = captchaURL => {
    debugger
    return {
        type: SET_CAPTCHA_URL,
        data: captchaURL
    }
}

export const setUserAuthData = (userId, email, login, isAuth, myData, captchaURL) => {
    return {
        type: SET_USER_AUTH_DATA,
        data: { userId, email, login, isAuth, myData, captchaURL }
    }
}

const setAuthError = error => {
    return {
        type: SET_AUTH_ERROR,
        data: error
    }
}

//THUNKS
export const chekAuthThunk = () => {
    return async dispatch => {
        let data = await authAPI.checkMyAuth();
        if (data.resultCode === 0) {
            let { id, login, email } = data.data;
            let myData = await profileAPI.getUserInfo(id); // загружаем объект с данными пользователя для гибкого использования
            if (myData) {
                dispatch(setUserAuthData(id, email, login, true, myData));
            }
        }
    }
}

export const loginThunk = values => {
    return async dispatch => {
        let data = await authAPI.login(values);
        if (data.resultCode === 0) {
            dispatch(setUserAuthData());
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaURLThunk());
            }
            dispatch(setAuthError(data.messages));
        }
    }
}

export const logoutThunk = () => {
    return async dispatch => {
        let data = await authAPI.logout();
        if (data.resultCode === 0) {
            dispatch(setUserAuthData(null, null, null, false, null, null));
        }
    }
}

export const getCaptchaURLThunk = () => {
    return async dispatch => {
        let data = await securityAPI.getCaptcha();
        dispatch(getCaptchaURLSuccess(data.url));
    }
}
export default authReducer;