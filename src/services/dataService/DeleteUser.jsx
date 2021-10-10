import http from "../httpServices"

const DeleteUser = (userId)=> {
    return  http.delete(`/user/${userId}`)
}

export default DeleteUser