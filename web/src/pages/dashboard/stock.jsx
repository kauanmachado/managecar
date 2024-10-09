import { FaCar } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import Input from "../../components/input";
import Card from "../../components/card";
import { CarServices } from "../../services/CarService";
import { useEffect, useState } from "react";
import GetId from "../../functions/get-id-from-token";

const carServices = new CarServices()
export default function Stock() {
  
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [search, setSearch] = useState("")
  const [year, setYear] = useState("")
  const [condition, setCondition] = useState("")
  const [brand, setBrand] = useState("")

  const userId = GetId()

  useEffect(() => {
    async function Get() {
      try {
        const res = await carServices.Get(userId)
        const data = res.data
        .filter((car) => car.available === true)
        .map((car) => {
          return {
            ...car,
            imgUrl: `http://localhost:9090/${car.img}`,
          }
        })
        setCars(data)
        setFilteredCars(data)
      } catch (error) {
        console.error(error)
      }
    }

    Get()
  }, [userId])

  const handleFilter = () => {
    let filtered = cars;
  
    // Filtro por nome do carro
    if (search) {
      filtered = filtered.filter((car) =>
        car.name?.toLowerCase().includes(search.toLowerCase()) // Verifica se 'car.name' existe antes de chamar 'toLowerCase'
      );
    }
  
    // Filtro por ano
    if (year) {
      filtered = filtered.filter((car) => car.year === parseInt(year));
    }
  
    // Filtro por condição (novo, usado, semi-novo)
    if (condition) {
      filtered = filtered.filter((car) => car.condition === condition);
    }
  
    // Filtro por marca
    if (brand) {
      filtered = filtered.filter((car) =>
        car.brand?.toLowerCase() === brand.toLowerCase() // Verifica se 'car.brand' existe antes de chamar 'toLowerCase'
      );
    }
  
    setFilteredCars(filtered);
  };

  useEffect(() => {
    handleFilter()
  }, [search, year, condition, brand, cars])

  const handleDeleteCar = (id) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id))
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10 transition-all duration-300">
        <h1 className="flex items-center gap-2 text-2xl mb-6 font-bold ">
          <FaCar className="text-indigo-800"/> Estoque
        </h1>

        <div className="mb-8 p-4 rounded-lg shadow border bg-white">
          <div className="flex justify-between items-center gap-4">
            <Input
              type="search"
              name="search"
              placeholder="Pesquisar veículo"
              className="w-full p-3 shadow border rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              id="year"
              className="w-48 p-3 shadow border rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
              value={year}
              onChange={(e) => setYear(e.target.value)} 
            >
              <option value="">Ano</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
            </select>

            <select
              id="condition"
              className="w-48 p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="">Condição</option>
              <option value="novo">Novo</option>
              <option value="usado">Usado</option>
              <option value="semi-novo">Semi-novo</option>
            </select>

            <select
              id="brand"
              className="w-48 p-3 shadow border rounded-lg shadow-sm focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
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
        {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <Card
                key={car.id}
                car={car}
                onDelete={handleDeleteCar}
                className="transition-transform transform hover:scale-105 shadow-lg"
                isSold={!car.available}
              />
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">
              Nenhum carro disponível
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
