import dialogReducer from './dialogsReducer';
import postReducer from './postsReducer';

let store = {
    _state: {
        dialogsData: {
            dataTextArea: '',
            dataMessages: [
                { message: 'Hello World!' },
                { message: 'Hi, whats up?' },
                { message: 'yeah fine mate' },
                { message: 'lmao' }
            ],

            dataUsers: [
                { name: 'Alex' },
                { name: 'Ethan' },
                { name: 'Gabriel' },
                { name: 'Mcevoy' },
                { name: 'Bob' },
                { name: 'Alice' },
                { name: 'Robert' },
                { name: 'Max' },
                { name: 'Phil' },
                { name: 'Dmitry' },
                { name: 'Xandor' },
                { name: 'brah' },
                { name: 'Boss' },
                { name: 'Angy' },
                { name: 'Arthour' },
            ],
        },

        postsData: {
            dataTextArea: '',
            postsMessages: [
                { post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
            ],
            postsComments: [

            ],
        },
    },

    _callSubscriber() {

    },
    getState() {
        return this._state;
    },
    subscribe(listener) { // pattern observer.
        this._callSubscriber = listener;
    },

    dispatch(action) { // object with type of action.

        this._state.dialogsData = dialogReducer(this._state.dialogsData, action);
        this._state.postsData = postReducer(this._state.postsData, action);
        this._callSubscriber(this._state);
    },
}


window.store = store;
export default store;
//getter setter



// switch (action.type) {

// case 'UPDATE-TEXTAREA-CONTENT':
//     this._state.dialogsData.dataTextArea = action.newText;
//     this._callSubscriber(this._state);
//     break;
// case 'SEND-POST':
//     if (this._state.dataTextArea !== '') {
//         let newPost = {
//             Post: this._state.dataTextArea
//         };
//         this._state.PostsData.PostsMessages.push(newPost);
//         this._state.dataTextArea = '';
//         this._callSubscriber(this._state);
//     }
//     break;
// case 'SEND-MESSAGE':
//     if (this._state.dialogsData.dataTextArea !== '') {
//         let newMessage = {
//             message: this._state.dialogsData.dataTextArea
//         };
//         this._state.dialogsData.dataMessages.push(newMessage);
//         this._state.dialogsData.dataTextArea = '';
//         this._callSubscriber(this._state);
//     }
//         break;
//     default:
//         break;
// }