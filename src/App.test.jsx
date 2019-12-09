import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(connect(withRouter( <App/> )), div);
    ReactDOM.unmountComponentAtNode(div);
});