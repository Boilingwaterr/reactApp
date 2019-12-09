import { profileAPI } from './../api/api';

const SEND_POST = 'profile/SEND-POST';
const DELETE_POST = 'profile/DELETE_POST';
const UPDATE_POST_TEXTAREA_CONTENT = 'profile/UPDATE-POST-TEXTAREA-CONTENT';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const SET_OWNER = 'profile/SET_OWNER';
const SET_PROFILE_INFO = 'profile/SET_PROFILE_INFO';

let initialState = {
    dataPostTextArea: '',
    postsMessages: [{
            post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            id: 1,
            time: {
                fullDate: `02.11.2019`,
                exactTime: `16:30:26`,
            }
        },
        {
            post: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            id: 2,
            time: {
                fullDate: `04.11.2019`,
                exactTime: `12:28:13`,
            }
        },
    ],
    postsComments: [],
    profile: null,
    myStatus: 'here should be status',
    isOwner: false
};

const ProfileReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_POST_TEXTAREA_CONTENT:
            return {
                ...state,
                dataPostTextArea: action.newText
            }

        case SEND_POST:
            if (state.dataPostTextArea !== '') {
                let now = new Date();

                let hours = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();

                let year = now.getFullYear();
                let month = now.getMonth();
                let day = now.getDate();

                const newPost = {
                    post: state.dataPostTextArea,
                    time: {
                        fullDate: `${day}.${month}.${year}`,
                        exactTime: `${hours}:${minutes}:${seconds}`,
                    }
                }

                return {
                    ...state,
                    postsMessages: [...state.postsMessages, newPost],
                    dataPostTextArea: '',
                }
            }
            return state;
        case DELETE_POST:
            return {
                ...state,
                postsMessages: state.postsMessages.filter(post => post.id !== action.id)
            }
        case SET_USER_PROFILE:

            return {
                ...state,
                profile: action.profileData
            }

        case SET_STATUS:
            return {
                ...state,
                myStatus: action.status
            }
        case SET_OWNER:
            return {
                ...state,
                isOwner: action.isOwner
            }

        case SET_PROFILE_INFO:
            const info = action.data.config.data;
            return {
                ...state,
                profile: JSON.parse(info)
            }
        default:
            return state;
    }
}

//Action creators
export const setProfileInfo = data => { //загрузить отредактированные данные профиля
    return { type: SET_PROFILE_INFO, data }
}

export const setOwnerActionCreator = isOwner => { //настроить хозяина страницы
    return { type: SET_OWNER, isOwner }
}
export const sendPostActionCreator = () => { //отправить пост
    return { type: SEND_POST };
}

export const deletePostActionCreator = id => { //удалить пост из профиля
    return { type: DELETE_POST, id };
}

export const updatePostTextAreaActionCreator = newText => { //заполнить велью текстарии
    return { type: UPDATE_POST_TEXTAREA_CONTENT, newText };
}

export const setUserProfile = profileData => { //загрузить информацию о профиле
    return { type: SET_USER_PROFILE, profileData };
}

export const setStatusActionCreator = status => { // установить статус
    return { type: SET_STATUS, status };
}

//Thunks
export const saveProfileInfo = values => {
    return async dispatch => {
        let data = await profileAPI.putUserInfo(values);
        dispatch(setProfileInfo(data));
    }
}
export const saveUserPhotoThunk = photo => {
    return async() => {
        await profileAPI.savePhoto(photo);
    }
}

export const getUserInfoThunk = userId => {
    return async dispatch => {
        let data = await profileAPI.getUserInfo(userId)
        dispatch(setUserProfile(data));
    }
}

export const getStatusThunk = userId => {
    return async dispatch => {
        let response = await profileAPI.getStatus(userId)
        if (response.data !== null) {
            dispatch(setStatusActionCreator(response.data));
        }
    }
}

export const changeStatusThunk = status => {
    return async dispatch => {
        let data = await profileAPI.putStatus(status)
        if (data.resultCode === 0) {
            dispatch(setStatusActionCreator(status));
        }
    }
}

export default ProfileReducer;