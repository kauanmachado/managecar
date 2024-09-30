import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"

export default function GetId(){
    const token = Cookies.get("token")
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.id

    return userId
}