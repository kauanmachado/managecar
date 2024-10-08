import { FaCar, FaMoneyBillWave } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import Input from "../../components/input";
import Card from "../../components/card";
import { CarServices } from "../../services/CarService";
import { useEffect, useState } from "react";
import GetId from "../../functions/get-id-from-token";

const carServices = new CarServices();
export default function Stock() {
  const [cars, setCars] = useState([]);

  const userId = GetId();

  useEffect(() => {
    async function Get() {
      try {
        const res = await carServices.Get(userId);
        setCars(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    Get();
  }, [userId]);

  const handleDeleteCar = (id) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id)); // Remove o carro da lista
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10 transition-all duration-300">
        <h1 className="flex items-center gap-2 text-2xl mb-6 font-bold ">
          <FaMoneyBillWave className="text-indigo-800"/> Carros vendidos
        </h1>

        <div className="mb-8 p-4 rounded-lg shadow border bg-white">
          <div className="flex justify-between items-center gap-4">
            <Input
              type="search"
              name="search"
              placeholder="Pesquisar veículo"
              className="w-full p-3 shadow border rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
            />

            <select
              id="year"
              className="w-48 p-3 shadow border rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
            >
              <option value="">Ano</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>

            <select
              id="condition"
              className="w-48 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
            >
              <option value="">Condição</option>
              <option value="novo">Novo</option>
              <option value="usado">Usado</option>
              <option value="semi-novo">Semi-novo</option>
            </select>

            <select
              id="brand"
              className="w-48 p-3 shadow border rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
            >
              <option value="">Marca</option>
              <option value="toyota">Toyota</option>
              <option value="honda">Honda</option>
              <option value="ford">Ford</option>
              <option value="chevrolet">Chevrolet</option>
              <option value="nissan">Nissan</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.length > 0 ? (
            cars.map((car) => (
              <Card key={car.id} car={car} onDelete={handleDeleteCar} className="transition-transform transform hover:scale-105 shadow-lg" />
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">Nenhum carro disponível</p>
          )}
        </div>
      </div>
    </div>
  );
}
