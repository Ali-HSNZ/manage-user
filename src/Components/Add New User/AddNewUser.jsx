import Styles from './AddNewUser.module.css'
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const AddNewUser = ({setAddUser , setUser , user}) => {

    const nameInput = useRef()

    
    const [newUser , setNewUser] = useState({
        first_name : '',
        last_name : '',
        email : '',
    })
    const [errorList , setErrorList] = useState(false)

    useEffect(()=>{
        nameInput.current.focus()
    },[])

    const changeHandler = (e)=> {
        setNewUser({...newUser , [e.target.name] : e.target.value })
    }

    const addUserHandler = (e)=> {
        e.preventDefault()
        const emailHandler = user.find(item => item.email === newUser.email)


        if(emailHandler === undefined){
            axios.post("http://localhost:3000/user/" ,newUser).then(()=>{
                axios.get("http://localhost:3000/user").then(newUser => {
                    setAddUser(false)
                    setUser(newUser.data)
            })
            }).catch()
        }else{
            alert("ایمیل تکراری است")
            setAddUser(true)
        }
      

        
    }


    return (  
        <form className={Styles.parent} onSubmit={addUserHandler} >
            <div className={Styles.main}>

                <div className={Styles.closeParent}>
                    <button className={Styles.close}  onClick={()=> setAddUser(false)}><AiOutlineClose size='18' /></button>
                </div>    
                

                <div className={Styles.groupParent}>
                    <div className={Styles.group}>
                        <input type="text" ref={nameInput} placeholder ="Enter Your Name ..." name="first_name" onChange={changeHandler}/>
                    </div>
                    <div className={Styles.group}>
                        <input type="text" placeholder ="Enter Your Last Name ..." name="last_name" onChange={changeHandler}/>
                    </div>
                    <div className={Styles.group}>
                        <input type="email" placeholder ="Enter Your Email ..." name="email" onChange={changeHandler}/>
                    </div>
               
                </div>
               
                <button type='submit' className={Styles.submit}>Submit</button>
                        
                    
            </div>
        </form>
    );
}
 
export default AddNewUser;