import { dialogsAPI } from './../api/api';

const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';
const GET_ALL_DIALOGS = 'dialogs/GET_ALL_DIALOGS';
const GET_CURRENT_DIALOG = 'dialogs/GET_CURRENT_DIALOG';
const ERROR = 'dialogs/ERROR';
const SETTING_COMPANION_INFO = 'dialogs/SETTING_COMPANION_INFO';
const CLEAR_MESSAGE_LIST = 'dialogs/CLEAR_MESSAGE_LIST';
const SET_MESSAGE_COUNT = 'dialogs/SET_MESSAGE_COUNT';

let initialState = {
    dataMessages: [],
    dataUsers: [],
    companionInfo: [],
    messageCount: [],
    error: null,

}
const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE:
            let now = new Date();

            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();

            let year = now.getFullYear();
            let month = now.getMonth();
            let day = now.getDate();

            const newMessage = {
                message: action.message,
                time: {
                    fullDate: `${day}.${month}.${year}`,
                    exactTime: `${hours}:${minutes}:${seconds}`,
                },
                id: now.getTime()
            }

            return {
                ...state,
                dataMessages: [...state.dataMessages, newMessage]
            }
        case GET_ALL_DIALOGS:

            return {
                ...state,
                dataUsers: action.payload.map(user => {
                    return {...state.dataUsers, user }
                })
            }
        case GET_CURRENT_DIALOG:
            return {
                ...state,
                dataMessages: action.payload.items
            }
        case ERROR:

            return {
                ...state,
                error: action.error,
            }
        case SETTING_COMPANION_INFO:
            return {
                ...state,
                companionInfo: action.payload
            }
        case SET_MESSAGE_COUNT:
            return {
                ...state,
                messageCount: action.payload
            }
        case CLEAR_MESSAGE_LIST:
            return {
                ...state,
                dataMessages: [],
                companionInfo: [],
                messageCount: [],
                error: null
            }
        default:
            return state;
    }
}

//action creators

export const clearMessageListActionCreator = () => { //удаляет список сообщений по анмoнтированию компонента
    return {
        type: CLEAR_MESSAGE_LIST
    }
}

export const sendMessageActionCreator = message => {
    return {
        type: SEND_MESSAGE,
        message
    };
}

export const getAllDialogsActionCreator = payload => {
    return {
        type: GET_ALL_DIALOGS,
        payload
    };
}

export const getDialoglistActionCreator = payload => {
    return {
        type: GET_CURRENT_DIALOG,
        payload
    };
}
export const errorsActionCreator = error => {
    return {
        type: ERROR,
        error,
    };
}

export const setCompanionInfoActionCreator = payload => {
    return {
        type: SETTING_COMPANION_INFO,
        payload
    }
}

export const countNewMessageAC = payload => {
        return {
            type: SET_MESSAGE_COUNT,
            payload
        }
    }
    //thunks
export const startDialogThunk = userId => {
    return async dispatch => {
        let response = await dialogsAPI.startDialog(userId);
        if (response.data.resultCode === 0) {
            dispatch(getAllDialogsThunk());
        } else {
            dispatch(errorsActionCreator(response.data.resultCode))
        }
    }
}

export const getAllDialogsThunk = () => { //getting all dialogs from server
    return async dispatch => {
        let response = await dialogsAPI.getAllDialogs();
        dispatch(getAllDialogsActionCreator(response.data));
    }
}

export const getCurrentDialogThunk = (userId, userInfo) => {
    return async dispatch => {
        let response = await dialogsAPI.getMessagesList(userId);
        dispatch(setCompanionInfoActionCreator(userInfo));
        dispatch(getDialoglistActionCreator(response.data));
    }
}

export const sendMessage = (userId, message) => {
    return async dispatch => {
        let response = await dialogsAPI.sendMessage(userId, message);
        if (response.name === 'Error') {
            dispatch(errorsActionCreator(response));
            dispatch(sendMessageActionCreator(`Your message: '${message}' was not sent due to an error: '${response}'.`));
        } else {
            dispatch(getCurrentDialogThunk(userId));
        }
    }
}

export const viewMessageThunk = messageId => {
    return async() => {
        await dialogsAPI.viewedMessage(messageId);
    }
}

export const countNewMessageThunk = () => {
    return async disptatch => {
        let response = await dialogsAPI.countNewMessage();
        disptatch(countNewMessageAC(response.data));
    }
}
export default dialogsReducer;