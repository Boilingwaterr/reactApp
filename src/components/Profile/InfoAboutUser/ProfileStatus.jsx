import React from 'react';
import Style from './InfoAboutUser.module.css';
import {maxLength} from './../../../utility/validators/validators';
import { Field, reduxForm } from 'redux-form';
import { renderField } from './../../common/Form/FormValidation';

const maxLength300 = maxLength(300);

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        myStatus: this.props.myStatus
    }

    setEditMode = () => {
        if(this.props.myId === this.props.profile.userId){
            if (!this.state.editMode){
                this.setState ({
                    editMode: true
                })
            }
            else {
                this.props.changeStatusThunk(this.state.myStatus);
                this.setState ({
                    editMode: false
                })
            }
        }
    }

    statusInputChange = (e) => {
        this.setState({
            myStatus: e.currentTarget.value
        })
    }

    componentDidUpdate (prevProps, prevState) {
        if(prevProps.myStatus !== this.props.myStatus){
            this.setState({
                myStatus: this.props.myStatus
            })
        }
    }
    render (){
        return (
            <div className={Style.profileStatus}>
                {!this.state.editMode
                ?
                    <span onDoubleClick={ this.setEditMode }>
                        { this.props.myStatus || 'put your status here'}
                    </span>

                :
                    <StatusReduxInput
                        setEditMode = {this.setEditMode}
                        statusInputChange = {this.statusInputChange}
                        initialValues = { this.state }
                    />
                }
            </div>
        );
    }
}

const StatusInput = props => {
    return (
        <form onSubmit = {props.setEditMode}>
            <Field
                name = 'myStatus' // with initialValues need to be named like state
                type = 'text'
                withoutTouch = {true}
                component = {renderField}
                onChange = { props.statusInputChange }
                setEditMode = {props.setEditMode}
                validate  = { maxLength300 }
            />
        </form>
    )
}

export const StatusReduxInput = reduxForm({
    form: 'statusInput',
    maxLength300
})(StatusInput);

export default ProfileStatus;