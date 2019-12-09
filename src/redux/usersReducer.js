import { usersAPI } from './../api/api';

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'users/SET_TOTAL_USER_COUNT';
const SET_TOGGLE_FOLLOWING_BUTTON = 'users/SET_TOGGLE_FOLLOWING_BUTTON';
const SEARCHING_USERS = 'users/SEARCHING_USERS';
const UPDATE_INPUT_TEXT = 'users/UPDATE_INPUT_TEXT';

let initialState = {
    users: [],
    currentPage: 1,
    pageSize: 50,
    totalUsersCount: 0,
    buttonDisabled: [],
    searchInputText: '',
    usersFilter: '',
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true };
                    }
                    return user;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false };
                    }
                    return user;
                })
            }

        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }

        case SET_TOTAL_USER_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }

        case SET_TOGGLE_FOLLOWING_BUTTON:
            return {
                ...state,
                buttonDisabled: action.boolean ? [...state.buttonDisabled, action.userId] : state.buttonDisabled.filter(id => id !== action.userId)
            }

        case UPDATE_INPUT_TEXT:
            return {
                ...state,
                searchInputText: action.data
            }

        case SEARCHING_USERS:
            let filter = state.searchInputText;
            return {
                ...state,
                usersFilter: filter
            }

        default:
            return state;
    }
}

//Action creators
export const followActionCreator = userId => {
    return { type: FOLLOW, userId };
}

export const unfollowActionCreator = userId => {
    return { type: UNFOLLOW, userId };
}

export const setUsersActionCreator = users => {
    return { type: SET_USERS, users };
}

export const setCurrentPageActionCreator = currentPage => {
    return { type: SET_CURRENT_PAGE, currentPage };
}

export const setTotalUserCountActionCreator = totalCount => {
    return { type: SET_TOTAL_USER_COUNT, totalCount };
}

export const setButtonDisablerActionCreator = (boolean, userId) => {
    return { type: SET_TOGGLE_FOLLOWING_BUTTON, boolean, userId };
}

export const searchUsersActionCreator = data => {
    return { type: SEARCHING_USERS, data }
}

export const inputChangeAC = data => {
    return { type: UPDATE_INPUT_TEXT, data }
}


//thunks
export const getUsersThunk = (currentPage, pageSize) => {
    return async dispatch => {
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setUsersActionCreator(data.items));
        dispatch(setTotalUserCountActionCreator(data.totalCount));
    }
}

export const pageChanger = (pageNumber, pageSize) => {
    return async dispatch => {
        dispatch(setCurrentPageActionCreator(pageNumber));
        let data = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(setUsersActionCreator(data.items));
    }
}

export const unFollow = userId => {
    return async dispatch => {
        dispatch(setButtonDisablerActionCreator(true, userId)); // set 'follow' button inactive
        let data = await usersAPI.deleteFollow(userId)
        if (data.resultCode === 0) {
            dispatch(unfollowActionCreator(userId));
        }
        dispatch(setButtonDisablerActionCreator(false, userId));
    }
}

export const follow = userId => {
    return async dispatch => {
        dispatch(setButtonDisablerActionCreator(true, userId)); // set 'follow' button inactive
        let data = await usersAPI.postFollow(userId)
        if (data.resultCode === 0) {
            dispatch(followActionCreator(userId));
        }
        dispatch(setButtonDisablerActionCreator(false, userId));
    }
}

export default usersReducer;