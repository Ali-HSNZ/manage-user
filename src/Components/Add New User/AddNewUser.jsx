import Styles from './AddNewUser.module.css'

import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import getAllUser from '../../services/dataService/GetAllUser';
import PostUser from '../../services/dataService/PostUser';

const AddNewUser = ({setAddUser , setUser , user}) => {

    const nameInput = useRef()

    useEffect(()=>{
        nameInput.current.focus()
    },[])

    const [newUser , setNewUser] = useState({
        first_name : '',
        last_name : '',
        email : '',
    })
    const changeHandler = (e)=> {
        setNewUser({...newUser , [e.target.name] : e.target.value })
    }

    const addUserHandler = ()=> {
       
        const emailHandler = user.find(item => item.email === newUser.email)

        if(emailHandler === undefined){

            const AddUser = async ()=>{
                try {
                    await PostUser(newUser)
                    const {data} = await getAllUser()
                    setUser(data)
                    setAddUser(false)
                    toast.success(`${newUser.first_name} ${newUser.last_name} Added`)
                } catch (UserError) {
                    toast.error(UserError)
                }
            }
            AddUser()
        }else{
            toast.warn(`email has already exist`)
            setAddUser(true)
        }
      

        
    }


    return (  
        <div className={Styles.parent} >
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
               
                <button className={Styles.submit} onClick={addUserHandler}>Submit</button>
                        
            </div>
        </div>
    );
}
 
export default AddNewUser;