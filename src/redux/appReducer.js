import { chekAuthThunk } from './authReducer'

const INITIALIZING = 'app/INITIALIZING';

let initialstate = {
    initialized: false
}

let appReducer = (state = initialstate, action) => {
    switch (action.type) {
        case INITIALIZING:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

//ACTION CREATORS
export const initializingAppActionCreator = () => {
    return {
        type: INITIALIZING
    }
}


//THUNKS
export const initializingAppThunk = () => {
    return dispatch => {
        let promise = dispatch(chekAuthThunk()); //checkauththunk return promise
        Promise.all([promise])
            .then(() => {
                dispatch(initializingAppActionCreator());
            })
    }
}

export default appReducer;