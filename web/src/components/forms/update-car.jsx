import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/input";
import { useForm } from "react-hook-form";
import { CarServices } from "../../services/CarService";
import GetId from "../../functions/get-id-from-token";
import { FaCar } from "react-icons/fa"; // Importar ícone para o botão

const carServices = new CarServices();

export default function FormAddCar() {
  const userId = GetId();
  const { register, handleSubmit, formState: { errors } } = useForm({
    // resolver: zodResolver(schema)
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

      const res = await carServices.Update(formData)
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(UpdateCar)} className="space-y-6 p-6 bg-white rounded-lg shadow-lg">

      <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaCar className="text-indigo-800" /> Adicionar Carro
      </h1>

      <Input
        {...register('brand')}
        type="text"
        placeholder="Digite o nome da marca"
        label="Marca"
        error={errors.brand?.message} // Mensagem de erro
      />

      <Input
        {...register('model')}
        type="text"
        placeholder="Digite o nome do modelo"
        label="Modelo"
        error={errors.model?.message}
      />

      <Input
        {...register('year')}
        type="number"
        placeholder="Digite o ano de lançamento"
        label="Ano de lançamento"
        error={errors.year?.message}
      />

      <Input
        {...register('motor')}
        type="text"
        placeholder="Digite o nome do motor"
        label="Motor"
        error={errors.motor?.message}
      />

      <Input
        {...register('kilometer')}
        type="number"
        placeholder="Digite a kilometragem"
        label="Kilometragem"
        error={errors.kilometer?.message}
      />

      <Input
        {...register('img')}
        type="file"
        accept="image/*"
        label="Imagem do carro"
        error={errors.img?.message}
      />

      <select
        {...register('condition')}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
      >
        <option value="">Condição do carro</option>
        <option value="Novo">Novo</option>
        <option value="Semi-novo">Semi-novo</option>
        <option value="Usado">Usado</option>
      </select>

      <select
        {...register('fuelType')}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
      >
        <option value="">Tipo de combustível</option>
        <option value="Gasolina">Gasolina</option>
        <option value="Etanol">Etanol</option>
        <option value="Diesel">Diesel</option>
      </select>

      <Input
        {...register('color')}
        type="text"
        placeholder="Digite o nome da cor"
        label="Cor"
        error={errors.color?.message}
      />

      <Input
        {...register('price')}
        type="number"
        placeholder="Digite o preço"
        label="Preço"
        error={errors.price?.message}
      />

      <button type="submit" className="bg-indigo-800 hover:bg-indigo-900 text-white py-3 px-4 rounded-xl w-full transition-all flex items-center justify-center">
        <FaCar className="mr-2" /> Adicionar carro
      </button>
    </form>
  );
}
