import { MdEmail } from "react-icons/md"
import Sidebar from "../../components/sidebar"
import { useEffect, useState } from "react"
import { FaMapMarked, FaPhone, FaUser } from "react-icons/fa"
import { UserServices } from "../../services/UserService"
import GetId from "../../functions/get-id-from-token"

const userServices = new UserServices()

export default function Dashboard() {
    const [data, setData] = useState(true)
    const userId = GetId()

    useEffect(() => {
        async function GetUser(){
            try {
                const res = await userServices.Get(userId)
                setData(res.data)
            } catch (error) {
                console.error("Erro ao buscar dados do usuário", error)
            }
        }

        GetUser()
    }, [userId])

    if(!data){
        return <div>Carregando...</div>
    }
   
    return (
        <div className="flex min-h-screen">
            
            <Sidebar />

            <div className="transition-all duration-300 flex-1 p-12 ">
                <h1 className="flex items-center gap-2 text-2xl mb-6 font-bold"><FaUser className="text-indigo-800"/>Geral</h1>
                <h1 className="text-2xl font-bold mb-4 text-gray-700">{data.name}</h1>
                <div className="space-y-4">
                    <p className="flex items-center text-gray-700 gap-2"><MdEmail />{data.email}</p>
                    <hr/>
                    <p className="flex items-center text-gray-700 gap-2"><FaMapMarked />{data.address}</p>
                    <hr/>
                    <p className="flex items-center text-gray-700 gap-2"><FaPhone />{data.phone}</p>
                    <hr/>
                </div>
            </div>
        </div>
    );
}
