import React from 'react';
import Style from './../Profile.module.css';
import { NavLink } from 'react-router-dom';

const UserBar = props => {
    return <>
    {!props.profileData.isOwner
    &&
    <div className = {Style.sendMessageButton} >
        <NavLink to = {`/dialogs/${props.profileData.profile.userId}`}><button
            onClick = {() => {
                props.startDialogThunk(props.profileData.profile.userId);
                props.getCurrentDialogThunk(props.profileData.profile.userId, props.profileData.profile)
            }}
            >Send Message</button>
        </NavLink>
    </div>
    }
</>
}
export default UserBar;

