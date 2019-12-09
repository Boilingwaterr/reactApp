import React from 'react';
import Style from './FormValidation.module.css';

export const renderField = ({input, withoutTouch, autocomplete, values, label, type, placeholder, setEditMode, meta: { touched, error, warning }}) => {

    return <div>
        <label>{label}</label>

        <input {...input}
            onBlur = {!error && setEditMode}
            onKeyDown = { e => {e.key === 'Enter' && e.preventDefault()} }
            autoFocus = { true }
            initialvalues = {values}
            placeholder={placeholder || label}
            type={type}
            autoComplete = {autocomplete}
        />

        {
            (((!!withoutTouch || touched) && error && <span className = {Style.errorSpan} >{error}</span>)
            ||
            ((!!withoutTouch || touched) && warning && <span className = {Style.warningSpan}>{warning}</span>))
        }
    </div>
}
