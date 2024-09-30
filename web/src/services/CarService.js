import { axiosInstance } from "./axios/AxiosConfig"


export class CarServices {
    Add(data){
        return axiosInstance.post("/cars/add", data)
    }
    Get(data){
        return axiosInstance.get("/cars/get", data)
    }
    GetById(){
        
    }
    Update(id, data){
        return axiosInstance.post(`/cars/${id}`, data)
    }
    Delete(id){
        return axiosInstance.delete(`/cars/${id}`)
    }
}