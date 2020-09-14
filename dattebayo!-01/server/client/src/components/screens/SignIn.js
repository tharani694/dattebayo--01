import React,{useState, useContext } from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../../App'
import Materialize from 'materialize-css';


const Login = () => {
        const {state,dispatch} = useContext(UserContext)
        const history = useHistory()
        const [password,setPassword] = useState("")
        const [email,setEmail] = useState("")
    
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                Materialize.toast({html: "Invalid email!",classes:"#c62828 red darken-3"})
                return
            }

        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data) 
            if(data.error){
                Materialize.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                Materialize.toast({html:"Signed In successfully!",classes:"#43a047 green darken-1"})
                history.push('/')
            }
        })
    }

    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Welcome Back</h2>
                <input 
                type="text" 
                placeholder="What's your email?"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                type="password" 
                placeholder="What's your password?"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect #64b5f6 blue darken-1" onClick={()=>PostData()}>Let's go!
        <i className="material-icons right">send</i>
        </button>
        <h5 className="small-link">
            <Link to="/signup">Don't have an account ?</Link>
        </h5>
        </div>
        </div>
    )
}
export default Login;


