import authReducer, { setUserAuthData } from './authReducer.js';

it('user should be authorized', () => {

    let action = setUserAuthData(2444, '@mail', 'login', true);

    let state = {
        userId: null,
        email: null,
        login: null,
        isAuth: false
    }

    let newState = authReducer(state, action)

    let checkType = (state, type) => {
        return typeof(state) === type;
    }

    expect(checkType(newState.userId, 'number')).toBe(true);
    expect(checkType(newState.email, 'string')).toBe(true);
    expect(checkType(newState.login, 'string')).toBe(true);
    expect(newState.isAuth).toBe(true);
});