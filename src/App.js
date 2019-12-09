import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Sidebar from './components/Sidebar/Sidebar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import LoginPageWrapper from './components/Login/Login';
import { connect } from 'react-redux';
import { initializingAppThunk } from './redux/appReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Preloader from './components/common/Preloader/Preloader';
import Error404 from './components/common/Errors/Error404';

class App extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.initializingAppThunk();
        }, 3000);
    }

    render() {
        if(!this.props.initialized){
            return <Preloader/>
        }

        return (
            <div className="App">
                <HeaderContainer />
                <Sidebar />
                <Switch>
                    <Route path = '/profile/:userId?' component = {ProfileContainer}/> {/*it may looks like render = {<component/>}*/}
                    <Route path = '/dialogs/:userId?' component = {DialogsContainer}/>
                    <Route path = '/users' component = {UsersContainer}/>
                    <Route path = '/settings' component = {Settings}/>
                    <Route path = '/login' component = {LoginPageWrapper}/>
                    <Redirect exact from = '/' to = '/profile'/>
                    <Route path = '*' component = {Error404}/>
                </Switch>
            </div>
        );
    }
}

let mapStateToProps = state =>{
    return {
        initialized: state.appData.initialized
    }
}

export default compose(
    connect(mapStateToProps,{initializingAppThunk}),
    withRouter
)(App);