import Styles from '../../Contaner/User/User.module.css'
import defualtImage from '../../image/default Image.jpg'
const ShowUser = ({Fname ,Lname , imgSrc , Handler}) => {


    // console.log(userId)

    
    return (  
        <div className={Styles.user_parent_center}>

                    <div className={Styles.user}>

                        <div className={Styles.userImg}>
                        <img alt="img" src={`${imgSrc ?imgSrc : defualtImage}`}/>
                        </div>

                        <div className={Styles.userName}>
                            
                            <p>Name : <span>{Fname}</span></p>
                            <p>Last Name : <span>{Lname}</span></p>
                            
                        </div>

                        <div className={Styles.userCheckOutParent}>
                            <button onClick={Handler}>See More</button>
                        </div>

                    </div>

                </div>
    );
}
 
export default ShowUser;