import React from 'react';
import Style from './Avatar.module.css';
import customAvatar from './../../../assets/customAvatar.jpg';

const Avatar = (props) => {

    return (
        <div className = { Style.avatar }>
            { (props.photo === null || props.photo === undefined )
            ? <img src = { customAvatar } alt = "a"/>
            : <img src = { props.photo } alt = "b"/> }
        </div>
    );
}

export default Avatar;
