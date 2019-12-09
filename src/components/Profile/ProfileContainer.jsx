import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {
    getUserInfoThunk,
    changeStatusThunk,
    getStatusThunk,
    deletePostActionCreator,
    setOwnerActionCreator,
    saveUserPhotoThunk,
    saveProfileInfo } from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { chekAuthThunk } from '../../redux/authReducer';
import { startDialogThunk, getCurrentDialogThunk } from './../../redux/dialogsReducer';

class ProfileContainer extends React.Component {

    refreshUser() {
        let userId = this.props.match.params.userId;
            if (!userId || userId === undefined) {
                userId = this.props.myId;
                    if(!userId || userId === undefined){
                        this.props.history.push('/login');
                    }
            }
        this.props.getUserInfoThunk(userId);
        this.props.getStatusThunk(userId);
        if(this.props.myId === userId){
            this.props.setOwnerActionCreator(true);
        } else {
            this.props.setOwnerActionCreator(false);
        }
    }

    componentDidMount() {
        this.refreshUser();
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.userId !== prevProps.match.params.userId)
        this.refreshUser();
    }

    deletePost = id => {
        this.props.profileData.isOwner &&
        this.props.deletePostActionCreator(id);
    }

    render() {
        return <>
            <Profile {...this.props} deletePost = { this.deletePost }/>
        </>
    }
}

let mapStateToProps = state => {
    return {
        profileData: state.profileData,
        myId: state.authData.userId,
        myData: state.authData.myData
    }
}

export default compose(
    connect(mapStateToProps, {
        getUserInfoThunk,
        getStatusThunk,
        changeStatusThunk,
        deletePostActionCreator,
        setOwnerActionCreator,
        saveUserPhotoThunk,
        saveProfileInfo,
        chekAuthThunk,
        startDialogThunk,
        getCurrentDialogThunk}),
    withRouter,
)(ProfileContainer);
