import React, {useState} from 'react';
import Style from './Paginator.module.css'

const Paginator = (props) => {
    let [portionNumber, changePortion] = useState(1)
    let portionSize = 5
    let pagesCount = Math.ceil(props.totalUsersCount/props.pageSize);
    let pages = [];
    let portionCount = Math.ceil(pagesCount / portionSize);

    for (let i = 1; i <= pagesCount; i++){
        pages.push(i);
    }
    console.log(portionNumber);
    return <div className = {Style.paginator} >
        <button onClick = {() =>{changePortion(portionNumber+1)}} >
            кнопка раз
        </button>

        {
        pages.filter(page => page >= 0 && page <= 5)
            .map(page =>{
            return(
                <button
                    key = {page}
                    className = { (props.currentPage === page) ? Style.currentPage : undefined }
                    onClick = {() => {props.onPageChanged(page)}}>
                    {page}
                </button>
                )
            })
        }

        <button onClick = { () =>{changePortion(portionNumber-1)} }>
            кнопка два
        </button>
    </div>
}


export default Paginator;