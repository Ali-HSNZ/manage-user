import Styles from "../../Contaner/User/User.module.css"
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import defualtImage from '../../image/default Image.jpg'
import GetOneUser from "../../services/dataService/GetOneUser";
import Loding from '../../Components/Loding/Loding';


const SeeMore = ({setSeeMore , userId , deleteHandler}) => {

    const [selectedId , setSelectedId] = useState(null)

    console.log(selectedId)

    useEffect(()=>{
        if(userId){
            const getUserInformation = async()=>{
                try {
                    const {data} = await GetOneUser(userId)
                    setSelectedId(data)
                } catch (error) {
                    alert(error)
                }
            }
            getUserInformation()
        }
       
    },[])

    return (  
        <div className={Styles.seeMoreButton_blackColor_parent}>
            <div className={Styles.seeMoreButton_parent}>
                {selectedId ? <>
                
                    <div className={Styles.seeMoreButton_img_parent}>
                        <img alt="img" src={`${selectedId.avatar ? selectedId.avatar : defualtImage}`}/>
                    </div>

                    <div className={Styles.seeMoreButton_text_parent}>
                        <div className={Styles.seeMoreButton_text}>

                            <p>Name : <span>{selectedId.first_name}</span></p>
                            <p>Last Name : <span>{selectedId.last_name}</span></p>
                            <p>Email : <span>{selectedId.email}</span></p>
                            
                        </div>
                    </div>

                    <div className={Styles.seeMoreButton_add_close_parent}>
                        <button className={Styles.seeMoreButton_close}  onClick={()=> setSeeMore(false)}>
                            <AiOutlineClose size='18' />
                        </button>
                        <button className={Styles.seeMoreButton_delete} onClick={()=>deleteHandler(selectedId)}>delete</button>
                    </div>

                    
                    </>
                    :
                    <Loding/>
                }
            </div>
        </div>
    );
}
 
export default SeeMore;