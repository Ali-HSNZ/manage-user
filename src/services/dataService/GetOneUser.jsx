import http from "../httpServices"

const GetOneUser = (userId)=> {
    return  http.get(`/user/${userId}`)
}

export default GetOneUser