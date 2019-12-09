import React from 'react';
import Style from './Paginator.module.css'


export default class Paginator extends React.Component {

    state = {
        portionNumber: 1
    }

    showFollowingPortion = (count) => {
        this.setState({portionNumber: count});
    }

    render(){
        let portionSize = 5
        let totalPagesCount = Math.ceil(this.props.totalUsersCount/this.props.pageSize);
        let portionCount = Math.ceil (totalPagesCount / portionSize);
        let leftBorder =  (this.state.portionNumber - 1) * portionSize + 1;
        let rightBorder =  this.state.portionNumber * portionSize;
        let pages = [];

        for (let i = 1; i <= totalPagesCount; i++){
            pages.push(i);
        }

        return <div className = {Style.paginator} >
            <div className = {Style.doubleArrow} >
                <span
                    onClick = { () => {this.showFollowingPortion(1)} }
                    className = {Style.leftArrowtoEnd}>
                </span>
            </div>
            {
                (this.state.portionNumber > 1) &&
                <span onClick = { () => {this.showFollowingPortion(this.state.portionNumber - 1)} } >
                    <div className = {Style.leftArrow} ></div>
                </span>
            }
            {
                pages.filter(page => page >= leftBorder && page <= rightBorder)
                .map(page =>{
                    return(
                        <span
                            key = {page}
                            className = { (this.props.currentPage === page) ? Style.currentPage : undefined }
                            onClick = {() => {this.props.onPageChanged(page)}}>
                            {page}
                        </span>
                    )
                })
            }

            {
                (portionCount > this.state.portionNumber) &&
                <span onClick = { () => {this.showFollowingPortion(this.state.portionNumber + 1)} }>
                    <span className = {Style.rightArrow}></span>
                </span>
            }
            <div className = {Style.doubleArrow} >
                <span
                    onClick = { () => {this.showFollowingPortion (totalPagesCount/portionSize)} }
                    className = {Style.rightArrowtoEnd}>
                </span>
            </div>
        </div>
    }
}
