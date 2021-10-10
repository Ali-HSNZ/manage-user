import http from "../httpServices"

const PostUser = (newUser)=> {
    return http.post("/user/",newUser)
    // console.log(newUser)
}

export default PostUser