import { useState } from 'react'
import Car from '../assets/imgs/gol-power.jpg'
import { CarServices } from '../services/CarService'
import Modal from './modal'

const carServices = new CarServices()

export default function Card({ car, onDelete }){
    const [isModalOpen, setModalOpen] = useState(false)

    async function handleDelete(id){
        try {
            await carServices.Delete(id)
            onDelete(id)
        } catch (error) {
            console.error("Erro ao remover carro: ", error)
        }
    }

    return (
        <div className="md:w-[300px] bg-white shadow rounded-lg cursor-pointer hover:shadow-lg transition-all">
            <img src={car.img}></img>
            <div className="p-4">
            <p className="font-bold">{car.brand} {car.model}</p>
            <p className="">{car.year}</p>
            <p className="">{car.kilometer}</p>
            <p className="text-gray-600">{car.condition}</p>
            <p className="text-1xl text-green-500 font-bold mb-4">R${car.price}</p>
            <hr/>
            <div className="flex justify-between gap-2">
            <button onClick={() => handleDelete(car.id)} className="font-bold bg-transparent hover:bg-red-200 mt-4 text-red-500 white py-2 px-4 rounded-xl w-full transition-all">
                    Remover
            </button>
            <button className="font-bold bg-transparent hover:bg-indigo-200 mt-4 text-indigo-800 py-2 px-4 rounded-xl w-full transition-all">
                    Editar
            </button>
            </div>

            <button onClick={() => setModalOpen(true)} className="bg-indigo-800 hover:bg-indigo-900 mt-4 text-white py-2 px-4 rounded-xl w-full transition-all">
                    Ver detalhes
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} car={car}/>

            </div>
        </div>
    )
}