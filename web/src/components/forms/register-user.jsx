import { useForm } from "react-hook-form"
import Input from "../input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { UserServices } from "../../services/UserService"
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

export default function RegisterUserForm() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        // mode: "onBlur",
        resolver: zodResolver(schema)
    })
    const navigate = useNavigate()

    async function registerUser(data) {
        try {
            const { confirm_password, ...restData } = data
            const res = await userServices.SignUp(restData)

            if(res.data.error == "Email ja cadastrado!"){
                alert(res.data.error)
            }
            alert("Usuário cadastrado com sucesso!")
            navigate("/")
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
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

            <button type="submit" className="bg-indigo-800 hover:bg-indigo-900 text-white py-3 px-4 rounded-xl w-full transition-all">
                Criar conta
            </button>
        </form>
    )
}