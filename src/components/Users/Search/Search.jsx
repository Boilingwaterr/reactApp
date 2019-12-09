import React from 'react';
import Style from './Search.module.css'

const SearchUsers = (props) => {

    let changeInput = (event) =>{
        let text = event.currentTarget.value
        props.inputChangeAC(text);
    }

    // let setFilter = () => {
    //     props.searchUsersActionCreator()
    // }

    return <div className = {Style.searchField}>
        <input
            type="text"
            placeholder = 'nickname'
            value = {props.searchInputText}
            onChange = {changeInput}
            />
        {/* <button onClick = { setFilter }>search</button> */}
    </div>
}

export default SearchUsers;