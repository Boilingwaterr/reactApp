import React, {useState} from 'react';
import Style from './Profile.module.css';
import Posts from './Posts/Posts';
import Avatar from '../common/Avatar/Avatar';
import InfoAboutUser from './InfoAboutUser/InfoAboutUser';
import { ProfileEditMode } from './InfoAboutUser/EditInfoAboutUser';
import TextAreaPostsContainer from './TextAreaPosts/TextAreaPostsContainer';
import Preloader from './../common/Preloader/Preloader';
import UserBar from './UserBar/UserBar';

const Profile = props => {
    const [editMode, setEditMode] = useState(false);
    const [editModePhoto, setEditModePhoto] = useState(false);
    const [loadPhoto, setLoadPhoto] = useState(false);

    const submit = values => {
        props.saveProfileInfo(values);
        props.chekAuthThunk();
        setEditMode(false);
    }

    if(!props.profileData.profile){
        return <Preloader />
    }

    return (
        <div className = { Style.profileContent }>
            <div className = {Style.topContent} >
                <div className = { Style.avatarPlace}
                    onMouseOver = { () => {setEditModePhoto(true)}}
                    onMouseLeave = { () => {
                        setEditModePhoto(false);
                        setLoadPhoto(false);
                        }}>
                    <Avatar photo = { props.profileData.profile.photos.large }/>
                    {props.profileData.isOwner && editModePhoto && <div className = {Style.editAvatar}>
                        <span onClick = {() => {setLoadPhoto(true)}}>Обновить фотографию</span>
                        {loadPhoto && <EditPhoto
                        chekAuthThunk = { props.chekAuthThunk }
                        saveUserPhotoThunk = { props.saveUserPhotoThunk }
                        getUserInfoThunk = { props.getUserInfoThunk }
                        myId = {props.myId}
                        />}
                    </div>}

                </div>
                <UserBar {...props}/>
                {
                editMode?
                <ProfileEditMode
                    profile = { props.profileData.profile }
                    myStatus = { props.profileData.myStatus }
                    changeStatusThunk = { props.changeStatusThunk }
                    myId = { props.myId }
                    setEditMode = { setEditMode }
                    onSubmit = { submit }
                    initialValues = {props.profileData.profile}
                />
                :
                <InfoAboutUser
                    profile = { props.profileData.profile }
                    myStatus = { props.profileData.myStatus }
                    changeStatusThunk = { props.changeStatusThunk }
                    myId = {props.myId}
                    setEditMode = {setEditMode}
                    isOwner = {props.profileData.isOwner}
                    editpic = {props.editpic}
                />}
            </div>
            <div className={Style.wrapWrapper}>
            {props.profileData.isOwner && <div className={Style.postsWrapper}>
                    <div className={Style.PostsPlace}>
                        <Posts
                            myData = {props.myData}
                            deletePost = { props.deletePost }
                            profileData = { props.profileData }
                        />
                    </div>
                    <div className={Style.txt}>
                        <TextAreaPostsContainer />
                    </div>
                </div>}
            </div>
        </div>
    );
}

const EditPhoto = props => {

    const  changePhoto = async e => {
        if(e.target.files.length){
            let photo = e.target.files[0];
            await props.saveUserPhotoThunk(photo);
            props.getUserInfoThunk(props.myId);
            props.chekAuthThunk();
        }
    }

    return <form className = {Style.photoEditor} >
        <input name = 'photoEditor' type = 'file' onChange = {changePhoto}/>
    </form>
}

export default Profile;

