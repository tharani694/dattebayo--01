import React,{useEffect, createContext, useReducer,useContext} from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPost from './components/screens/SubscriberPost'
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=>{
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            dispatch({type:"USER",payload:user})
            //history.push('/')
        }else{
            //if(!history.location.pathname.startsWith('/reset'))
            history.push('/signin')
        }
    },[])
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/signin">
                <SignIn />
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
            <Route path="/createpost">
                <CreatePost/>
            </Route>
            <Route path="/profile/:userid">
                <UserProfile />
            </Route>
            <Route path="/myfollowingpost">
                <SubscribedUserPost />
            </Route>
            </Switch>
    )
}


function App() {
    const [state,dispatch] = useReducer(reducer,initialState)
    

    return (
        <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
            <Navbar />
            <Routing />

        </BrowserRouter>
        </UserContext.Provider>
    );
}
export default App

