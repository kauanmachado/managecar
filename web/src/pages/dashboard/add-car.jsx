import { FaPlus } from "react-icons/fa"
import FormAddCar from "../../components/forms/add-car"

import Sidebar from "../../components/sidebar"

export default function AddCar(){
    return (
        <div className="flex min-h-screen">
            <Sidebar/>

            <div className="transition-all duration-300 flex-1 p-10">
                <h1 className="flex items-center gap-2 text-2xl mb-8 font-bold text-gray-500"><FaPlus />Adicionar carro</h1>

                <FormAddCar />
            </div>
        </div>
    )
}