import React from 'react';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getAllDialogsThunk, getCurrentDialogThunk, viewMessageThunk, clearMessageListActionCreator } from '../../redux/dialogsReducer';


class DialogContainer extends React.Component {


    componentDidMount() {
        this.props.getAllDialogsThunk();
    }

    render (){
        return <Dialogs {...this.props} />
    }
}
let mapStateToProps = state => {
    return {
        dialogsData: state.dialogsData,
        myData: state.authData.myData
    }
}

export default compose(
    connect(mapStateToProps, {
        getCurrentDialogThunk,
        getAllDialogsThunk,
        viewMessageThunk,
        clearMessageListActionCreator}),
    withAuthRedirect,
)(DialogContainer);
