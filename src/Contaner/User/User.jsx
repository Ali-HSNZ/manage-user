import { useEffect, useState } from 'react'
import Styles from './User.module.css'
import ShowUser from '../../Components/ShowUser/ShowUser';
import SeeMore from '../../Components/See More Btn/SeeMore';
import AddNewUser from '../../Components/Add New User/AddNewUser';

import {toast } from 'react-toastify';
import getAllUser from '../../services/dataService/GetAllUser';
import DeleteUser from '../../services/dataService/DeleteUser';
import Loding from '../../Components/Loding/Loding';
const User = () => {

    const [seeMore,setSeeMore] =  useState(false);
    const [addUser , setAddUser] = useState(false);
    
    const [error , setError] = useState(false)

    const [user , setUser] = useState(null)

    const [userId , setUserId] = useState(null)


// get All Data
    useEffect(()=> {
        const getAllData = async()=> {

            try {
                const {data} = await getAllUser()
                setUser(data)
            } catch (error) {
                setError({massage : "Loading Data Error"})      
                toast.error(error.massage) 
            }
           
        }
        getAllData()
    },[])

    const deleteHandler = (getDeletedID)=> {
        if(getDeletedID){

            try {
                const deleteUser = async () => {
                    await DeleteUser(userId)
                    toast.success(`${getDeletedID.first_name} ${getDeletedID.last_name} Removed`)
                    const {data} = await getAllUser()
                    setUser(data)
                    setSeeMore(false)
                }
                deleteUser()
            } catch (error) {
                toast.error(error)
            }
        
        }
    }
    error && toast.error(error.massage)
   
    const renderShowUser = ()=> {

        let returnValue = <Loding/>

        if(user && !error){
            returnValue = user.map((user) =>{
                return (
                    <ShowUser
                        key={user.id} 
                        Fname={user.first_name} 
                        Lname={user.last_name} 
                        imgSrc={user.avatar} 
                        Handler= {()=> { return( setUserId(user.id), setSeeMore(true))}}
                    />
                )
            })
        }
        return returnValue;
    }

    

    return (  
        <div className={Styles.parent}>
            <div className={Styles.parent_center}>

                {seeMore && <SeeMore userId={userId}  setSeeMore={setSeeMore} deleteHandler={deleteHandler}/>}
                {addUser && <AddNewUser user={user}  setUser={setUser}  setAddUser={setAddUser}/>}

                
                <div className={Styles.addUser_parent}>
                    <button  
                        className={Styles.addUser} 
                        onClick={   ()=>setAddUser(true)    }>
                        Add New User
                    </button>
                </div>

                <div className={Styles.user_parent}>{   renderShowUser()    }</div>

            </div>
        </div>

    );
}
 
export default User;