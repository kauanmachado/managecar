import { axiosInstance } from "./axios/AxiosConfig"


export class UserServices {
    SignIn(data){
        return axiosInstance.post("/users/sign-in", data)
    }
    SignUp(data){
        return axiosInstance.post("/users/sign-up", data)
    }
    Get(id){
        return axiosInstance.get(`/users/${id}`)
    }
    Update(id, data){
        return axiosInstance.post(`/users/${id}`, data)
    }
}