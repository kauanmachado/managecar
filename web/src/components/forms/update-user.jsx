import { useForm } from "react-hook-form"
import Input from "../input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { UserServices } from "../../services/UserService"
import GetId from "../../functions/get-id-from-token"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const schema = z.object({
    email: z.string().email({ message: 'Por favor, insira um email válido.' }),
    name: z.string(),
    password: z.string().min(5, { message: 'A senha deve ter pelo menos 5 caracteres.' }),
    confirm_password: z.string(),
    phone: z.string(),
    address: z.string(),
}).refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não coincidem.',
    path: ['confirm_password']
})

const userServices = new UserServices()

export default function FormUpdateUser() {
    const navigate = useNavigate()
    const [data, setData] = useState(true)
    const userId = GetId()

    useEffect(() => {
        async function GetUser(){
            try {
                const res = await userServices.Get(userId)
                setData(res.data)
                setValue('email', res.data.email)
                setValue('name', res.data.name)
                setValue('phone', res.data.phone)
                setValue('address', res.data.address)
                
            } catch (error) {
                console.error("Erro ao buscar dados do usuário", error)
            }
        }

        GetUser()
    }, [userId])

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    async function updateUser(data) {
        try {
            const { confirm_password, ...restData } = data
            await userServices.Update(userId, restData)
            navigate('/dashboard')

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(updateUser)} className="space-y-4">
            <Input
                {...register('email')}
                type="email"
                placeholder="Digite seu email"
                label="E-mail"
                helperText={errors.email?.message}
            />

            <Input
                {...register('name')}
                type="text"
                placeholder="Digite o nome da sua concessionária"
                label="Concessionária"
                helperText={errors.nome_concess?.message}
            />

            <Input
                {...register('password')}
                type="password"
                placeholder="Digite sua senha"
                label="Senha"
                helperText={errors.password?.message}
            />

            <Input
                {...register('confirm_password')}
                type="password"
                placeholder="Digite sua senha novamente"
                label="Confirmar Senha"
                helperText={errors.confirm_password?.message}
            />

            <Input
                {...register('phone')}
                type="tel"
                placeholder="Digite o número de telefone"
                label="Número de telefone"
                helperText={errors.tel?.message}
            />

            <Input
                {...register('address')}
                type="text"
                placeholder="Digite o endereço"
                label="Endereço"
                helperText={errors.address?.message}
            />

            <button type="submit" className="bg-indigo-800 hover:bg-indigo-900  text-white py-3 px-4 rounded-xl w-full transition-all">
                Confirmar alteração
            </button>
        </form>
    )
}