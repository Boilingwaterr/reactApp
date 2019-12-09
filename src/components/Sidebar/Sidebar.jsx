import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Style from './Sidebar.module.css';
import { connect } from 'react-redux';
import { countNewMessageThunk } from '../../redux/dialogsReducer';

const Sidebar = props => {

    const { countNewMessageThunk, messageCount, isAuth} = props

    useEffect(() => {
        isAuth && countNewMessageThunk();
    }, [messageCount, countNewMessageThunk, isAuth]);

    return (
        <div className={Style.sidebar}>
            <div>
                <NavLink to = '/profile' activeClassName={Style.active}>
                    My profile
                </NavLink>
            </div>
            <div><NavLink to = '/dialogs' activeClassName={Style.active}>
                    Messages{ (messageCount === 0 || []) ? '' : `: ${messageCount}`}
                </NavLink>
            </div>
            <div>
                <NavLink to = '/users' activeClassName={Style.active}>
                    Users
                </NavLink>
            </div>
        </div>
    );
}

let mapStateToProps = state => {
    return {
        messageCount: state.dialogsData.messageCount,
        isAuth: state.authData.isAuth
    }
}

export default connect(mapStateToProps,{countNewMessageThunk})(Sidebar);
