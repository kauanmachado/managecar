import Cookies from "js-cookie"
import { IoMdLogOut } from "react-icons/io"
import { useNavigate } from "react-router-dom"

export default function Logout(){

    const handleLogout = () => {
        Cookies.remove('token')
        window.location.href = '/'
    }

    return (
        <button onClick={handleLogout} className="flex items-center block hover:bg-red-100 transition-all rounded-md p-2 gap-4 text-red-500 mt-4">
            <IoMdLogOut />
            Sair da conta
        </button>
    )
};