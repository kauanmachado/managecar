import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { UserServices } from "../../services/UserService"
import Input from "../input"
import { useUserContext } from "../../contexts/user-provider"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

const schema = z.object({
    email: z.string().email({ message: 'Por favor, insira um email válido.' }),
    password: z.string()
})

const userServices = new UserServices


export default function SignInForm() {
    const cookieExpiresInSeconds = 60 * 60 * 24 * 30
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })
    const navigate = useNavigate()
    const { handleLoggedIn } = useUserContext()

    async function SignInUser(data, e){
        e.preventDefault()

        try {
            const res = await userServices.SignIn(data)
            const token = res.data.token
            Cookies.set("token", token, {expires: cookieExpiresInSeconds})
            console.log(token)
            handleLoggedIn(token)
            navigate("/dashboard")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(SignInUser)} className="space-y-4">
            <Input
                {...register('email')}
                type="email"
                placeholder="Digite seu email"
                label="E-mail"
                helperText={errors.email?.message}
                >
            </Input>

            <Input
                {...register('password')}
                type="password"
                placeholder="Digite sua senha"
                label="Senha">
            </Input>

            <button type="submit" className="bg-indigo-800 hover:bg-indigo-900 text-white py-3 px-4 rounded-xl w-full transition-all">
                Acessar minha conta
            </button>


        </form>
    )
}