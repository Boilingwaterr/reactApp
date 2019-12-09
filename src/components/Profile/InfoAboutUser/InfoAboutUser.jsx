import React from 'react';
import Style from './InfoAboutUser.module.css';
import ProfileStatus from './ProfileStatus';
import editPic from './../../../assets/editPic.png'
const InfoAboutUser = props => {
    return (
        <div className={Style.infoAboutUser}>
            <div><h2>{props.profile.fullName}</h2></div>
            <div>
                <ProfileStatus
                    myStatus = { props.myStatus }
                    changeStatusThunk = { props.changeStatusThunk }
                    myId = {props.myId}
                    profile = {props.profile}
                />
            </div>
            <div>
                <h3>about me:</h3>
                <p>{props.profile.aboutMe}</p>
            </div>
            <div>
                <h3>Contacts:</h3>
                {Object.keys(props.profile.contacts).map(key =>{
                return <Contacts key={key} title = {key} value = {props.profile.contacts[key]} />
                })}
            </div>
            {
                props.isOwner &&
                <div className = {Style.editButton} onClick = {() => {props.setEditMode(true)}}>
                    <img src={editPic} alt='edit'/>
                </div>
            }
        </div>
    );
}

const Contacts = props => !!props.value && <div><b>{props.title}:</b> <p>{props.value}</p></div>

export default InfoAboutUser;