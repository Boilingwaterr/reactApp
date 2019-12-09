import React from 'react';
import Style from './InfoAboutUser.module.css';
import ProfileStatus from './ProfileStatus';
import {Field, reduxForm} from 'redux-form';
import { renderField } from './../../common/Form/FormValidation';

let InfoAboutUserEditMode = props => {

    console.log('render edit info')

    const {handleSubmit} = props;

    return (
        <form className={Style.infoAboutUser} onSubmit = {handleSubmit}>
            <Field
                name = 'fullName'
                type = 'text'
                placeholder = {props.profile.fullName}
                values = {props.profile.fullName}
                component = {renderField}
            />
            <div>
                <ProfileStatus
                    myStatus = { props.myStatus }
                    changeStatusThunk = { props.changeStatusThunk }
                    myId = {props.myId}
                    profile = {props.profile}
                    editMode = {true}
                />
            </div>
            <div>
                <h3>about me:</h3>
                <Field
                    name = 'aboutMe'
                    type='text'
                    placeholder = {props.profile.aboutMe}
                    component = {renderField} />
            </div>
            <div>
            <h3>lookingForAJob:</h3>
                <Field
                    name = 'lookingForAJob'
                    type = 'checkbox'
                    placeholder = {props.profile.lookingForAJob}
                    component = {renderField}
                />
            </div>
            <div>
            <h3>lookingForAJobDescription: </h3>
                <Field
                    name = 'lookingForAJobDescription'
                    type = 'text'
                    placeholder = {props.profile.lookingForAJobDescription}
                    component = {renderField}
                />
            </div>
            <div>
                <h3>Contacts:</h3>
                {Object.keys(props.profile.contacts).map(key =>{
                    return <Field
                        name = {`contacts.${key}`}
                        placeholder = {props.profile.contacts[key]}
                        key = {key}
                        type='text'
                        label = {key}
                        component = {renderField}
                    />
                })}
            </div>
            <div className = {Style.saveButton}>
                <button type = 'submit' >Сохранить</button>
            </div>
        </form>
    );
}

export const ProfileEditMode = reduxForm({
    form: 'ProfileEditMode'
})(InfoAboutUserEditMode)