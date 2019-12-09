import React from 'react';
import { renderField } from './../../common/Form/FormValidation';
import { Field, reduxForm } from 'redux-form';
import { sendMessage } from './../../../redux/dialogsReducer';
import { connect } from 'react-redux';
import Style from './TextAreaDialogs.module.css'

let DialogsInput = props => {
    const {handleSubmit} = props;

    let submitOnEnter = e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

return <>
    <form
        onSubmit = {handleSubmit}
        onKeyDown = {e => submitOnEnter(e)}
        className = {Style.dialogsForm}
    >
        <Field
            name = 'dialog'
            type = 'text'
            component = {renderField}
            autocomplete = 'off'
            placeholder = 'Type message here...'
        />
        <button type = 'submit'>Send message</button>
    </form>
</>
}

export const DialogsReduxInput = reduxForm({
    form: 'dialogInput'
})(DialogsInput);

class DialogsInputWrapper extends React.Component {

    submit = values => {
        values.dialog !== '' && this.props.sendMessage(this.props.userId, values.dialog);
        values.dialog = '';
    }

    render() {
        return <>
        <DialogsReduxInput
            onSubmit = {this.submit}
        />
    </>
    }

}

let mapStateToProps = state => {
    return {
        dialogsData: state.dialogsData,
    }
}

export default connect(mapStateToProps, {sendMessage})(DialogsInputWrapper);

