import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import {
    getUsersThunk,
    pageChanger,
    unFollow,
    follow,
    inputChangeAC,
    searchUsersActionCreator } from './../../redux/usersReducer';
import { compose } from 'redux';
import { chekAuthThunk } from './../../redux/authReducer';
class UsersContainer extends React.Component {

    componentDidMount () {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = pageNumber => {
        this.props.pageChanger(pageNumber, this.props.pageSize);
    }

    searching = text => {
        return user => {
            return user.name.toLowerCase().includes(text.toLowerCase());
        }
    }
    render () {
        return <Users
        { ...this.props }
        searching = { this.searching }
        onPageChanged  = { this.onPageChanged }/>
    }
}

let mapStateToProps = state => {
    return{
        users: state.usersData.users,
        currentPage: state.usersData.currentPage,
        pageSize: state.usersData.pageSize,
        totalUsersCount: state.usersData.totalUsersCount,
        buttonDisabled: state.usersData.buttonDisabled,
        searchInputText: state.usersData.searchInputText,
        searchUsersActionCreator: state.usersData.searchUsersActionCreator,
        isAuth: state.authData.isAuth,
    }
}
let mapDispatchToProps = dispatch => {
    return{
        follow: userId => {
            dispatch(follow(userId));
        },
        unFollow: userId => {
            dispatch(unFollow(userId));
        },
        getUsersThunk: (currentPage, pageSize) => {
            dispatch(getUsersThunk(currentPage, pageSize));
        },
        pageChanger: (pageNumber, pageSize) =>{
            dispatch(pageChanger(pageNumber, pageSize));
        },
        inputChangeAC: text => {
            dispatch(inputChangeAC(text));
        },
        searchUsersActionCreator: () => {
            dispatch(searchUsersActionCreator());
        },
        chekAuthThunk: () => {
            dispatch(chekAuthThunk())
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(UsersContainer);
