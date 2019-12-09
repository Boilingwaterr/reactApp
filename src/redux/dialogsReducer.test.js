import dialogsReducer, { sendMessageActionCreator } from './dialogsReducer.js';

it('message should be send', () => {
    let action = sendMessageActionCreator();
    let state = {
        dataDialogTextArea: 'some text for sending',
        dataMessages: [
            { message: 'Hello World!' },
            { message: 'Hi, whats up?' },
            { message: 'yeah fine mate' },
            { message: 'lmao' }
        ],
    }

    let newState = dialogsReducer(state, action)

    expect(newState.dataMessages.length).toBe(5);
});