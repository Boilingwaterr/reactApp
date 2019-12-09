import React from 'react';
import Style from './TextAreaPosts.module.css';

const TextAreaPosts = (props) => {

    let sendPost = (event) => {
        props.sendPost(event);
    }

    let onPostsTextAreaStateChange = (event) =>{
        let text = event.target.value;
        props.onPostsTextAreaStateChange(text)
    }

    return (
        <div className={Style.textareaBox}>
            <textarea
                onChange={onPostsTextAreaStateChange}
                value={props.dataPostTextArea}
                onKeyDown={sendPost}
                placeholder="Type message here..."
            />
        </div>
    );
}

export default TextAreaPosts;