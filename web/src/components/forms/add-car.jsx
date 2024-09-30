import { zodResolver } from "@hookform/resolvers/zod"
import Input from "../../components/input"
import { useForm } from "react-hook-form"
import { CarServices } from "../../services/CarService"
import GetId from "../../functions/get-id-from-token"

const carServices = new CarServices()

export default function FormAddCar() {
    const userId = GetId()
    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: zodResolver(schema)
    })

    async function AddCar(data){
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

            const res = await carServices.Add(formData)
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(AddCar)} className="space-y-4">

            <Input
                {...register('brand')}
                type="text"
                placeholder="Digite o nome da marca"
                label="Marca"

            />

            <Input
            {...register('model')}
                type="text"
                placeholder="Digite o nome do modelo"
                label="Modelo"

            />

            <Input
                {...register('year')}
                type="number"
                placeholder="Digite o ano de lançamento"
                label="Ano de lançamento"

            />

            <Input
                {...register('motor')}
                type="text"
                placeholder="Digite o nome do motor"
                label="Motor"

            />

            <Input
                {...register('kilometer')}
                type="number"
                placeholder="Digite a kilometragem"
                label="Kilometragem"

            />

            <Input
                {...register('img')}
                type="file"
                accept="image/*"
                label="Imagem do carro"

            />

            <select
                {...register('condition')}
                className="p-2 border shadow border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-indigo-800"
            >
                <option value="">Condição do carro</option>
                <option value="toyota">Novo</option>
                <option value="honda">Semi-novo</option>
                <option value="ford">Usado</option>

            </select>

            <select
                 {...register('fuelType')}
                className="p-2 border shadow border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-indigo-800"
            >
                <option value="">Tipo de combustível</option>
                <option value="toyota">Gasolina</option>
                <option value="honda">Etanol</option>
                <option value="ford">Diesel</option>

            </select>

            <Input
                {...register('color')}
                type="text"
                placeholder="Digite o nome da cor"
                label="Cor"

            />

            <Input
                {...register('price')}
                type="number"
                placeholder="Digite o preço"
                label="Preço"

            />

            <button type="submit" className="bg-indigo-800 hover:bg-indigo-900 text-white py-3 px-4 rounded-xl w-full transition-all">
                Adicionar carro
            </button>
        </form>
    )
}