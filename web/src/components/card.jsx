import { useState } from 'react'
import Car from '../assets/imgs/gol-power.jpg'
import { CarServices } from '../services/CarService'
import Modal from './modal'
import EditCarModal from './edit-car-modal'
import { useNavigate } from 'react-router-dom'

const carServices = new CarServices()

export default function Card({ car, onDelete, onSell, isSold }) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [isEditModalOpen, setEditModalOpen] = useState(false)
    const navigate = useNavigate()


    async function handleDelete(id) {
        const isConfirmed = window.confirm("Tem certeza que deseja remover este veículo?")

        if (isConfirmed) {
            try {
                const res = await carServices.Delete(id)
                onDelete(id)
                console.log(res)
            } catch (error) {
                console.error("Erro ao remover carro: ", error)
            }
        }
    }

    async function handleSell(id) {
        const isConfirmed = window.confirm("Tem certeza que deseja marcar este veículo como vendido?")

        if (isConfirmed) {
            try {
                await carServices.Sell(id)
                onSell(id)
                navigate("/sold")
            } catch (error) {
                console.error("Erro ao marcar o carro como vendido:", error)
            }
        }
    }

    return (
        <div className="md:w-[300px] bg-white shadow rounded-lg cursor-pointer hover:shadow-lg transition-all">
            <img src={car.imgUrl} className="md:h-[300px] w-full"></img>
            <div className="p-4">
                <p className="font-bold">{car.brand} {car.model}</p>
                <p className="">{car.year}</p>
                <p className="">{car.kilometer} KM</p>
                <p className="text-gray-600">{car.condition}</p>
                <p className="text-1xl text-green-500 font-bold mb-4">R${car.price}</p>
                <hr />
                <div className="flex justify-between gap-2">
                    <button onClick={() => handleDelete(car.id)} className="font-bold bg-transparent hover:bg-red-200 mt-4 text-red-500 white py-2 px-4 rounded-xl w-full transition-all">
                        Remover
                    </button>
                    {!isSold && (
                        <button onClick={() => setEditModalOpen(true)} className="font-bold bg-transparent hover:bg-indigo-200 mt-4 text-indigo-800 py-2 px-4 rounded-xl w-full transition-all">
                            Editar
                        </button>
                    )}

                </div>

                <button onClick={() => setModalOpen(true)} className="bg-indigo-800 hover:bg-indigo-900 mt-4 text-white py-2 px-4 rounded-xl w-full transition-all">
                    Ver detalhes
                </button>

                {!isSold && (
                    <button onClick={() => handleSell(car.id)} className="bg-green-800 hover:bg-green-900 mt-4 text-white py-2 px-4 rounded-xl w-full transition-all">
                        Marcar como vendido
                    </button>
                )}

                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} car={car} />

                <EditCarModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} car={car} />

            </div>
        </div>
    )
}