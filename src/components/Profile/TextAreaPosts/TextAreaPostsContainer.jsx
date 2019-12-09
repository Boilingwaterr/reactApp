import {
    sendPostActionCreator,
    updatePostTextAreaActionCreator } from './../../../redux/profileReducer';
import TextAreaPosts from './TextAreaPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        dataPostTextArea: state.profileData.dataPostTextArea
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendPost: (event) => {
            if (event.key === 'Enter' && !event.shiftKey){
            dispatch(sendPostActionCreator());
            event.preventDefault();
            }
        },
        onPostsTextAreaStateChange: (text) => {
            dispatch(updatePostTextAreaActionCreator(text));
        }
    }
}

const TextAreaPostsContainer = connect(mapStateToProps, mapDispatchToProps)(TextAreaPosts);

export default TextAreaPostsContainer;

