import React, { useRef, useEffect } from 'react';
import Style from './Dialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem';
import MessagesItem from './MessagesItem/MessagesItem';
import DialogsInputWrapper from './TextAreaDialogs/DialogsInput';

const Dialogs = props => {

    const { match, clearMessageListActionCreator} = props;

    const messageList = useRef([]);

    useEffect(() => {
        match.params.userId === undefined && clearMessageListActionCreator();
        return () => {
            clearMessageListActionCreator();
        }
    }, [match.params.userId, clearMessageListActionCreator]); //перевыполнит если зависимость изменится

    useEffect(() => {
        messageList.current.scrollTop =  messageList.current.offsetHeight;
    });

    let dataMessagesUi = props.dialogsData.dataMessages
        .map(data => <MessagesItem
            key = { data.id }
            message = { data }
            dialogsData = { props.dialogsData }
            myData = { props.myData }
            getCurrentDialogThunk = { props.getCurrentDialogThunk }
            viewMessageThunk = { props.viewMessageThunk }/>);

    let dataUsersUi = props.dialogsData.dataUsers
        .map(item => <DialogsItem
            key = { item.user.id }
            getCurrentDialogThunk = { props.getCurrentDialogThunk }
            dialogUserInfo = { item.user }
            />);//mapping data to DialogsItem.jsx

    return (
        <div className = { Style.Dialogs }>
            <div className = { Style.dialogsList }>
                <div className = { Style.list }>
                    {dataUsersUi}
                </div>
            </div>
            <div className = { Style.hr }></div>
            <div className = { Style.messagesBox }>
                <div className = { Style.messageList } ref = { messageList }>
                    {dataMessagesUi}
                </div>
                <div className = { Style.sendMessageArea }>
                {props.match.params.userId !== undefined && <DialogsInputWrapper
                    userId = { props.match.params.userId }
                />}
                </div>
            </div>
        </div>
    );
}

export default Dialogs;