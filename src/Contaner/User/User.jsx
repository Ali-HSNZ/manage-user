import { useEffect, useState } from 'react'
import Styles from './User.module.css'
import ShowUser from '../../Components/ShowUser/ShowUser';
import SeeMore from '../../Components/See More Btn/SeeMore';
import AddNewUser from '../../Components/Add New User/AddNewUser';
import axios from 'axios';
const User = () => {

    const [seeMore,setSeeMore] =  useState(false);
    const [addUser , setAddUser] = useState(false);

    const [user , setUser] = useState(null)

    const [userId , setUserId] = useState(null)

// get All Data
    useEffect(()=> {
        axios.get('http://localhost:3000/user').then((respanse)=>{
            setUser(respanse.data)
        }).catch(error => alert(error))
    },[])

    const deleteHandler = (getDeletedID)=> {
        if(getDeletedID){

            console.log("Deleted ID : ",getDeletedID)

            axios.delete(`http://localhost:3000/user/${userId}`).then(()=>{
                axios.get("http://localhost:3000/user").then((respanse)=>{
                    setUser(respanse.data)
                    setSeeMore(false)
                }).catch()
            }).catch()
        }
     
    }

    

    return (  
        <div className={Styles.parent}>
            <div className={Styles.parent_center}>

                {seeMore && <SeeMore userId={userId}  setSeeMore={setSeeMore} deleteHandler={deleteHandler}/>}
                {addUser && <AddNewUser user={user}  setUser={setUser}  setAddUser={setAddUser}/>}

                
                <div className={Styles.addUser_parent}>
                    <button  
                        className={Styles.addUser} 
                        onClick={()=>setAddUser(true)}>
                        Add New User
                    </button>
                </div>

                <div className={Styles.user_parent}>
                    {user ? user.map((user) =>{return <ShowUser
                        key={user.id} 
                        Fname={user.first_name} 
                        Lname={user.last_name} 
                        imgSrc={user.avatar} 
                        Handler= {()=> {return setUserId(user.id) , setSeeMore(true)}}
                        />}
                    )
                    :
                        <p style={{
                                color : 'green' , 
                                fontFamily:'iransansweb',
                                textAlign:'center' , 
                                backgroundColor:"#90ff8c" , 
                                width : '100%',
                                padding : "15px 0"
                            }}>
                                Loading Data... please wait
                            </p>}
                </div>
            </div>
        </div>
    );
}
 
export default User;