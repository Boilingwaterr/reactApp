import React from 'react';
import { chekAuthThunk, logoutThunk} from './../../redux/authReducer';
import Header from './Header';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setOwnerActionCreator } from '../../redux/profileReducer';

class HeaderContainer extends React.Component {

    componentDidMount () {
        this.props.chekAuthThunk(); //при загрузке хедера происходит запрос на сервер о авторизации
    }

    componentDidUpdate (prevProps) {
        if(prevProps.isAuth !== this.props.isAuth){
            this.props.chekAuthThunk();
        }
    }

    logout = () =>{
        this.props.logoutThunk();
        this.props.setOwnerActionCreator(false);
    }

    render () {
       return <Header {...this.props} logout = {this.logout} />
    }

}

let mapStateToProps = state => {
    return {
        isAuth: state.authData.isAuth,
        login: state.authData.login,
        id: state.authData.userId,
        myData: state.authData.myData,
        isOwner: state.profileData.isOwner
      }
}

export default compose(connect(mapStateToProps,{chekAuthThunk, logoutThunk, setOwnerActionCreator}))(HeaderContainer);

// export default connect(mapStateToProps, {chekAuthThunk})(HeaderContainer);
