import { FaPlus } from "react-icons/fa"
import FormAddCar from "../../components/forms/add-car"

import Sidebar from "../../components/sidebar"

export default function AddCar(){
    return (
        <div className="flex min-h-screen">
            <Sidebar/>

            <div className="transition-all duration-300 flex-1 p-10">
                <FormAddCar />
            </div>
        </div>
    )
}