import http from "../httpServices"

const getAllUser = ()=> {
    return http.get("/user")
}

export default getAllUser