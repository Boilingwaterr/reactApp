import usersReducer, {
    followActionCreator,
    unfollowActionCreator,
    setUsersActionCreator
} from './usersReducer.js';

it('followed should be true(folow)', () => {
    let userId = 1;
    let action = followActionCreator(userId);

    let state = {
        users: [{
            id: 1,
            followed: false
        }],

    };

    let newState = usersReducer(state, action)

    expect(newState.users.map(u => u.followed)).toStrictEqual([true]);
});

it('followed should be false(unfolow)', () => {
    let userId = 1;
    let action = unfollowActionCreator(userId);

    let state = {
        users: [{
            id: 1,
            followed: true
        }],

    };

    let newState = usersReducer(state, action)

    expect(newState.users.map(u => u.followed)).toStrictEqual([false]);
});

it('set users', () => {
    let users = [{ user: 'user' }, { user: 'user' }, { user: 'user' }];
    let action = setUsersActionCreator(users);

    let state = {
        users: [],
    };

    let newState = usersReducer(state, action)

    expect(newState.users.length).toBe(3);
});