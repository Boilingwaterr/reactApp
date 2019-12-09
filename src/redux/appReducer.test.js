import appReducer, { initializingAppActionCreator } from './appReducer.js';

it('app reducer should be initialized', () => {
    let action = initializingAppActionCreator();
    let state = {
        initialized: false
    }

    let newState = appReducer(state, action)

    expect(newState.initialized).toBe(true);
});