
import { FaCar } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import Input from "../../components/input";
import Card from "../../components/card";

export default function Sold(){
    return (
        <div className="flex min-h-screen">
            
            <Sidebar />

            <div className="transition-all duration-300 flex-1 p-10">
                <h1 className="flex items-center gap-2 text-2xl mb-4 font-bold text-gray-500"><FaCar />Carros vendidos</h1>
                <div className="flex jusitfy-between items-center gap-6 mb-6">
                <Input
                        type="search"
                        name="search"
                        placeholder="Digite o nome do veículo"
                    >
                    </Input>
                    <select
                        id="year"
                        className="p-2 border shadow border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-800 focus:border-indigo-800"
                    >
                        <option value="">Ano</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>

                    {/* Select - Condição */}
                    <select
                        id="condition"
                        className="p-2 border shadow border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-800 focus:border-indigo-800"
                    >
                        <option value="">Condição</option>
                        <option value="novo">Novo</option>
                        <option value="usado">Usado</option>
                        <option value="semi-novo">Semi-novo</option>
                    </select>

                    {/* Select - Marca */}
                    <select
                        id="brand"
                        className="p-2 border shadow border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-indigo-800"
                    >
                        <option value="">Marca</option>
                        <option value="toyota">Toyota</option>
                        <option value="honda">Honda</option>
                        <option value="ford">Ford</option>
                        <option value="chevrolet">Chevrolet</option>
                        <option value="nissan">Nissan</option>
                    </select>
                </div>

                <div className="">
                    <Card/>
                </div>
            </div>
        </div>
    )
}