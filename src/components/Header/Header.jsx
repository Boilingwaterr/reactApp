import React, {useState} from 'react';
import Style from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Avatar from '../common/Avatar/Avatar';

const Header = (props) => {
    const [isOpenBar, setOpenBar] = useState(false);

    const setBarState = () => {
        isOpenBar ? setOpenBar(false) : setOpenBar(true);
    }

    return (
        <div className={Style.header}>
        {props.isAuth && props.myData !== null ?
            <div
                className = { Style.userMenu }
                onClick = {setBarState}
                onMouseLeave = {!!isOpenBar ? setBarState : undefined }
            >
            <div className={Style.miniAva}>
                <Avatar photo = { props.myData.photos.small } />
            </div>
            <div>
                {props.myData.fullName}
            </div>
            <div className = { Style.corner } ></div>
            {!!isOpenBar &&
            <div className = {Style.navMenu} >
                <div>
                    <NavLink to = { `/profile` }  activeClassName={Style.active}>Profile</NavLink>
                </div>
                <div>
                    <NavLink to = { `/settings` }  activeClassName={Style.active}>Settings</NavLink>
                </div>
                <div onClick={()=>{props.logout(); setOpenBar(false);}}><p>Logout</p></div>
            </div> }
            </div>
            :
            <div className={Style.login}>
                <NavLink to="/login" >Login</NavLink>
            </div>

        }
        </div>
  );
}

export default Header;