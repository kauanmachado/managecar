import { FaCar, FaMoneyBillWave } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import Input from "../../components/input";
import Card from "../../components/card";
import { CarServices } from "../../services/CarService";
import { useEffect, useState } from "react";
import GetId from "../../functions/get-id-from-token";

const carServices = new CarServices();

export default function Sold() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchModel, setSearchModel] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [condition, setCondition] = useState("");
  const userId = GetId();

  useEffect(() => {
    async function Get() {
      try {
        const res = await carServices.Get(userId);
        const data = res.data
          .filter((car) => car.available === false)
          .map((car) => {
            return {
              ...car,
              imgUrl: `http://localhost:9090/${car.img}`,
            };
          });
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error(error);
      }
    }

    Get();
  }, [userId]);

  const handleFilter = () => {
    let filtered = cars;

    // Filtro por modelo
    if (searchModel) {
      filtered = filtered.filter((car) =>
        car.model?.toLowerCase().includes(searchModel.toLowerCase())
      );
    }

    // Filtro por marca
    if (searchBrand) {
      filtered = filtered.filter((car) =>
        car.brand?.toLowerCase().includes(searchBrand.toLowerCase())
      );
    }

    // Filtro por ano
    if (searchYear) {
      filtered = filtered.filter((car) => car.year === searchYear);
    }

    // Filtro por condição (novo, usado, semi-novo)
    if (condition) {
      filtered = filtered.filter((car) => car.condition === condition);
    }

    setFilteredCars(filtered);
  };

  // Atualiza os filtros quando qualquer estado de busca muda
  useEffect(() => {
    handleFilter();
  }, [searchModel, searchBrand, searchYear, condition, cars]);

  const handleDeleteCar = (id) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10 transition-all duration-300">
        <h1 className="flex items-center gap-2 text-2xl mb-6 font-bold ">
          <FaMoneyBillWave className="text-indigo-800"/> Carros Vendidos
        </h1>

        <div className="mb-8 p-4 rounded-lg shadow border bg-white">
          <div className="flex justify-between items-center gap-4">
            <Input
              type="search"
              name="searchModel"
              placeholder="Pesquisar por modelo"
              className="w-full p-3 shadow border rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
              value={searchModel}
              onChange={(e) => setSearchModel(e.target.value)}
            />

            <Input
              type="search"
              name="searchBrand"
              placeholder="Pesquisar por marca"
              className="w-full p-3 shadow border rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
            />

            <Input
              type="string"
              name="searchYear"
              placeholder="Pesquisar por ano"
              className="w-full p-3 shadow border rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
              value={searchYear}
              onChange={(e) => setSearchYear(e.target.value)}
            />

            <select
              id="condition"
              className="w-48 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="Novo">Novo</option>
              <option value="Usado">Usado</option>
              <option value="Semi-novo">Semi-novo</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <Card
                key={car.id}
                car={car}
                onDelete={handleDeleteCar}
                isSold={!car.available}
                className="transition-transform transform hover:scale-105 shadow-lg"
              />
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">
              Nenhum carro disponível na lista de vendas
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
