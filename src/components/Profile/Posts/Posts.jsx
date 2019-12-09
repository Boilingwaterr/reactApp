import React from 'react';
import Style from './Posts.module.css';
import PostsItem from './PostsItem/PostsItem';

const Posts = (props) => {
    let i = 0;
    let postsUi = props.profileData.postsMessages
        .map(data => <PostsItem
            myData = {props.myData}
            deletePost = { props.deletePost }
            id = {data.id}
            key = {i++}
            post = { data.post }
            time = { data.time }
        />);

    return (
        <div className={Style.Posts}>
            {postsUi}
        </div>
    );
}

export default Posts;