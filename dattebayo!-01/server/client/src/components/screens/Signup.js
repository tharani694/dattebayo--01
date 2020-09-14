import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import Materialize from 'materialize-css'

const Signup = ()=>{
        const history = useHistory()
        const [name,setName] = useState("")
        const [password,setPassword] = useState("")
        const [email,setEmail] = useState("")
        const [image,setImage] = useState("")
        const [url,setUrl] = useState(undefined)
        useEffect(()=>{
            if(url){
                uploadFields()
            }
        },[url])
        const uploadPic = ()=>{
            const data = new FormData()
                   data.append("file",image)
                   data.append("upload_preset","dattebyo")
                   data.append("cloud_name","maryam694")
                   fetch("https://api.cloudinary.com/v1_1/maryam694/image/upload",{
                       method:"post",
                       body:data
                   })
                   .then(res=>res.json())
                   .then(data=>{
                      setUrl(data.url)
                   })
                   .catch(err=>{
                       console.log(err)
                   })
            
        }
        
        const uploadFields =() =>{
            if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                Materialize.toast({html: "Invalid email!",classes:"#c62828 red darken-3"})
                return
            }

        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                Materialize.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                Materialize.toast({html:data.message,classes:"#43a047 green darken-1"})
                history.push('/signin')
            }
        })
        }

        const PostData = ()=>{
            if(image){
                uploadPic()
            }else{
                uploadFields()
            }
        }


        return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Welcome ! </h2>
                <input 
                type="text" 
                placeholder="What's your Name?"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
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
                <div className="file-field input-field">
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Upload Image</span>
                            <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                        </div>


                <button className="btn waves-effect #64b5f6 blue darken-1" onClick={()=> PostData()}>Let's go!
        <i className="material-icons right">send</i></button>
        <h5 className="small-link">
            <Link to="/signin">Already have an account ?</Link>
        </h5>
        </div>
        </div>
        )
    }
export default Signup;


