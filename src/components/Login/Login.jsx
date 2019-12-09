import React  from 'react';
import {Field, reduxForm} from 'redux-form';
import Style from './Login.module.css';
import { connect } from 'react-redux';
import { loginThunk } from './../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import { requiredField } from './../../utility/validators/validators';
import { renderField } from './../common/Form/FormValidation';

let LoginForm = props => {

    const {handleSubmit} = props;//now our props (onSubmit = {submit}) contain in handleSubmit

    return (
        <form className = {Style.loginForm} onSubmit = {handleSubmit}>
                <Field
                    withoutTouch = {false}
                    name = 'email'
                    type = 'email'
                    label = 'Your Email'
                    validate = {requiredField}
                    component = {renderField}
                />
                <Field
                    withoutTouch = {false}
                    name = 'password'
                    type = 'password'
                    label = 'Your Password'
                    validate = {requiredField}
                    component = {renderField}
                />
            { props.captchaURL && <div className = {Style.captchaWrapper} >
                <div><img src={props.captchaURL} alt="captcha"/></div>
                <Field name = 'captcha' type = 'text' component = {renderField} />
            </div>}
            { props.authError !== null && <div className = { Style.errorWrapper } >{props.authError}</div> }
            <div className = {Style.buttonWrapper} >
                <button type = 'submit'>SUBMIT</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

class LoginPage extends React.Component {

    submit = values => {
        this.props.loginThunk(values);
    }

    render() {
        if(this.props.authData.isAuth){
            return <Redirect to = {`/profile`}/>
        }
        return <div className = {Style.loginFormWrapper}>
        <LoginReduxForm
            captchaURL = {this.props.authData.captchaURL}
            authError = {this.props.authData.authError}
            onSubmit = {this.submit}
        />
    </div>
    }

}

let mapStateToProps = state => {
    return {
        authData: state.authData,
    }
}

const LoginPageWrapper = connect(mapStateToProps, {loginThunk})(LoginPage);

export default LoginPageWrapper;