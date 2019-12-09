import React, {useState} from 'react';
import Style from '../Posts.module.css';
import Avatar from './../../../common/Avatar/Avatar';
import likePic from './../../../../assets/likePic.png'
import settingPic from './../../../../assets/settingPic.png'
import commentPic from './../../../../assets/commentPic.png'

const PostsItem = (props) => {
    const [settingMode, setSettingMode] = useState(false)

    const setSettingModeFunc = () => {
        !settingMode && setSettingMode(true);
        settingMode && setSettingMode(false);
    }

    return (
        <div className={Style.post}>
            <div className = { Style.postHeader } >
                <div className = { Style.postPhoto } ><Avatar photo = { props.myData.photos.small } /></div>
                <div className = { Style.postSender } >
                    <h3>{props.myData.fullName}</h3>
                    <h4>{props.time.fullDate}</h4>
                    <h4>{props.time.exactTime}</h4>
                </div>

            </div>
            <div className = { Style.postContent } >
                <p>{ props.post }</p>
            </div>
            <div className = { Style.postFooter }>
                <div><img src={likePic} alt="like"/><p></p></div>
                <div><img src={commentPic} alt="comment"/></div>
                <div onClick = {setSettingModeFunc}>
                    <img src={settingPic} alt="setting"/>
                </div>
                {settingMode &&
                <SettingMyPost deletePost = {props.deletePost} id = {props.id}/>}
            </div>
        </div>
    );
}

export default PostsItem;

export const SettingMyPost = props => {
    return <div className = {Style.settingPost}>
        <div onClick = {() => {props.deletePost(props.id)}}>Delete post</div>
    </div>
}