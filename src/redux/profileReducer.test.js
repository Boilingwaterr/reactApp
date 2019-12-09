import ProfileReducer, {
    sendPostActionCreator,
    setUserProfile,
    setStatusActionCreator,
    deletePostActionCreator
} from './ProfileReducer.js';

it('post should be send', () => {

    let action = sendPostActionCreator();

    let state = {
        dataPostTextArea: 'some text for sending',
        postsMessages: [{
                post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                id: 1
            },
            {
                post: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                id: 2
            },
        ]
    };

    let newState = ProfileReducer(state, action)

    expect(newState.postsMessages.length).toBe(3);
});

it('profile data loading', () => {
    let data = true;
    let action = setUserProfile(data);
    let state = {
        profile: null,
    };

    let newState = ProfileReducer(state, action)

    expect(newState.profile).toBe(true);
});

it('set status', () => {

    let status = 'status';

    let action = setStatusActionCreator(status);

    let state = {
        myStatus: 'here should be status'
    };

    let newState = ProfileReducer(state, action)

    expect(newState.myStatus).toBe('status');
});

it('post should be deleted', () => {
    let id = 1;
    let action = deletePostActionCreator(id);

    let state = {
        postsMessages: [{
                post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                id: 1
            },
            {
                post: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                id: 2
            },
        ]
    };

    let newState = ProfileReducer(state, action)

    expect(newState.postsMessages.length).toBe(1);
});