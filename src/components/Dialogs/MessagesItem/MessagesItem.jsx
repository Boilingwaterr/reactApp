import React, {useState, useEffect} from 'react';
import Style from './MessagesItem.module.css';

import Avatar from './../../common/Avatar/Avatar';


const MessagesItem = props => {

    const { dialogsData } = props;

    const [companionInfo, setCompanionInfo] = useState([]);

    useEffect(() => {
        setCompanionInfo(dialogsData.companionInfo);
        return () => {
        };
    }, [dialogsData.companionInfo]);

    let styled;//стили для отрисовки сообщения(прочитано, не прочитано или с ошибкой )
    if (dialogsData.error === null) {
        if(props.message.viewed === true){
            styled = Style.message;
        } else {
            styled = Style.messageUnread;
        }
    } else {
        styled = Style.messageError
    }

    return (
        <div className = {styled} onClick = {() =>{
            console.log(companionInfo)
            companionInfo !== undefined
            && !props.message.viewed
            && props.getCurrentDialogThunk(companionInfo.id, companionInfo);
        }}>
            <div className = {Style.photoWrapper} >
                <Avatar
                photo = {props.myData.userId === props.message.senderId
                    ? props.myData.photos.small
                    : dialogsData.companionInfo && dialogsData.companionInfo.photos.small}
                />
            </div>
            <div className = {Style.contentWrapper}>
                <div className = {Style.nameWrapper} >
                    <h3>{ props.myData.userId === props.message.senderId
                    ? props.myData.fullName
                    : props.message.senderName}
                    </h3>
                </div>
                <div className = {Style.dateWrapper} >
                    <p>{ props.message.addedAt }</p>
                </div>
                <div className = {Style.messageWrapper}>
                    <p>{  props.message.body }</p>
                </div>
            </div>
        </div>
    );
}

export default MessagesItem;

