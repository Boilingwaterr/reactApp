import React from 'react';
import Style from './Users.module.css';
// import customAvatar from './../../assets/Avatar/customAvatar.jpg';
import { NavLink } from 'react-router-dom';
import Avatar from '../common/Avatar/Avatar';
import SearchUsers from './Search/Search';
import Paginator from '../common/Paginator/Paginator';

let Users = (props) => {

    return  <div className = { Style.usersPage }>
        <Paginator
            totalUsersCount = { props.totalUsersCount }
            pageSize = { props.pageSize }
            onPageChanged = { props.onPageChanged }
            currentPage = { props.currentPage }
        />

    <SearchUsers
        searchInputText = { props.searchInputText }
        inputChangeAC = { props.inputChangeAC }
        searchUsersActionCreator = { props.searchUsersActionCreator }
    />
    {
        props.users.filter(props.searching(props.searchInputText))
            .map(user => <div key = {user.id} className = { Style.userWrapper }>
            <div className = { Style.firstPiece }>
                <NavLink to = {`/profile/${user.id}`}>
                    <Avatar photo = {user.photos.small}/>
                </NavLink>
                {user.followed
                ? !!props.isAuth && <button disabled = {props.buttonDisabled.some(id => id === user.id)}
                onClick = { () => {props.unFollow(user.id)} }>Unfollow</button>
                : !!props.isAuth && <button disabled = {props.buttonDisabled.some(id => id === user.id)} //some method arrays
                onClick = { () => {props.follow(user.id)} }>Follow</button>}
            </div>
            <div className = { Style.secondPiece }>
                <div>{`${user.name}`}</div>
                <div>{`status: ${user.status === null ? 'empty' : user.status}`}</div>
            </div>
        </div>)}
    </div>
}

export default Users;