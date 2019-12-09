import React from 'react';
import Style from './DialogsItem.module.css';
import { NavLink } from 'react-router-dom';
import Avatar from './../../common/Avatar/Avatar';

const DialogsItem = props => {
    let path = `/dialogs/${ props.dialogUserInfo.id }`;
    let profilePath = `/profile/${ props.dialogUserInfo.id }`
    return (
        <div className = { Style.list }>
                <div className = {Style.dialogWrapper}>
                    <div className = {Style.miniAva}>
                    <NavLink to = {profilePath}>
                        <Avatar photo = {props.dialogUserInfo.photos.small}/>
                    </NavLink>
                    </div>
                    <div className = {Style.nameWrapper} >
                        <NavLink
                            onClick = { () => { props.getCurrentDialogThunk(props.dialogUserInfo.id, props.dialogUserInfo) } }
                            activeClassName = { Style.listActive }
                            to = { path }>
                            <p>
                                {props.dialogUserInfo.userName}
                            </p>
                        </NavLink>
                    </div>
                </div>
        </div>
    );
}

export default DialogsItem;