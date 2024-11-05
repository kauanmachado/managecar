import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaCar } from "react-icons/fa"; // Ícone para o botão
import Input from "./input";
import GetId from "../functions/get-id-from-token";
import { CarServices } from "../services/CarService";
import { useNavigate } from "react-router-dom";

const carServices = new CarServices();

export default function EditCarModal({ isOpen, onClose, car, onUpdate }) {
  const userId = GetId()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      brand: car?.brand,
      model: car?.model,
      year: car?.year,
      motor: car?.motor,
      kilometer: car?.kilometer,
      condition: car?.condition,
      fuelType: car?.fuelType,
      color: car?.color,
      price: car?.price,
    }
  });

  async function UpdateCar(data) {
    try {
      const formData = new FormData()

      formData.append("brand", data.brand)
      formData.append("model", data.model)
      formData.append("year", data.year)
      formData.append("motor", data.motor)
      formData.append("kilometer", data.kilometer)
      formData.append("condition", data.condition)
      formData.append("fuelType", data.fuelType)
      formData.append("color", data.color)
      formData.append("price", data.price)
      formData.append("img", data.img[0])
      formData.append("userId", userId)


      const res = await carServices.Update(car.id, formData)
      console.log(res)
      onClose()
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaCar className="text-indigo-800" /> Editar Carro
        </h1>
        <form onSubmit={handleSubmit(UpdateCar)} className="space-y-6">
          <Input {...register('brand')} type="text" placeholder="Marca" label="Marca" error={errors.brand?.message} />
          <Input {...register('model')} type="text" placeholder="Modelo" label="Modelo" error={errors.model?.message} />
          <Input {...register('year')} type="number" placeholder="Ano" label="Ano" error={errors.year?.message} />
          <Input {...register('motor')} type="text" placeholder="Motor" label="Motor" error={errors.motor?.message} />
          <Input {...register('kilometer')} type="number" placeholder="Kilometragem" label="Kilometragem" error={errors.kilometer?.message} />
          <Input {...register('img')} type="file" accept="image/*" label="Imagem" error={errors.img?.message} />
          
          <select {...register('condition')} className="w-full p-3 border border-gray-300 rounded-md">
            <option value="Novo">Novo</option>
            <option value="Semi-novo">Semi-novo</option>
            <option value="Usado">Usado</option>
          </select>

          <select {...register('fuelType')} className="w-full p-3 border border-gray-300 rounded-md">
            <option value="Gasolina">Gasolina</option>
            <option value="Etanol">Etanol</option>
            <option value="Diesel">Diesel</option>
          </select>

          <Input {...register('color')} type="text" placeholder="Cor" label="Cor" error={errors.color?.message} />
          <Input {...register('price')} type="number" placeholder="Preço" label="Preço" error={errors.price?.message} />

          <button type="submit" className="bg-indigo-800 hover:bg-indigo-900 text-white py-2 px-4 rounded-lg w-full">
            Salvar Alterações
          </button>

        </form>
        <button onClick={onClose} className="w-full mt-4 bg-gray-200 text-gray-600 py-2 px-4 rounded-lg">
          Cancelar
        </button>
      </div>
    </div>
  );
}
