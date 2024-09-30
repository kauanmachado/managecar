import { useState } from 'react'
import Car from '../assets/imgs/gol-power.jpg'

export default function Card(){
    const [isModalOpen, setModalOpen] = useState(false)

    return (
        <div className="md:w-[300px] shadow rounded-lg ">
            <img src={Car}></img>
            <div className="p-4">
            <p className="font-bold">Gol G3 1.0 Power</p>
            <p className="">2000</p>
            <p className="">150.000km</p>
            <p className="text-gray-600">Semi-novo</p>
            <p className="text-1xl text-green-500 font-bold mb-4">R$14.000</p>
            <hr/>
            <div className="flex justify-between gap-2">
            <button className="font-bold bg-transparent hover:bg-red-200 mt-4 text-red-500 white py-2 px-4 rounded-xl w-full transition-all">
                    Remover
            </button>
            <button className="font-bold bg-transparent hover:bg-indigo-200 mt-4 text-indigo-800 py-2 px-4 rounded-xl w-full transition-all">
                    Editar
            </button>
            </div>

            <button onClick={() => setModalOpen(true)} className="bg-indigo-800 hover:bg-indigo-900 mt-4 text-white py-2 px-4 rounded-xl w-full transition-all">
                    Ver detalhes
            </button>

            

            </div>
        </div>
    )
}