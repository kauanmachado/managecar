import { FaUserEdit } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import FormUpdateUser from "../../components/forms/update-user";

export default function UpdateUser() {
    return (
        <div className="flex min-h-screen">

            <Sidebar />

            <div className="transition-all duration-300 flex-1 p-10">
                <h1 className="flex items-center gap-2 text-2xl mb-4 font-bold text-gray-500"><FaUserEdit />Atualizar dados</h1>

                <FormUpdateUser />
            </div>
        </div>
    )
}