import { Link } from 'react-router-dom'
import Input from '../components/input'
import SignInForm from '../components/forms/login-user'

export default function SignIn() {
    return (
        <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col shadow rounded md:w-[600px] p-12 gap-4">
            <h1 className="font-bold text-2xl">Bem-vindo ao ManageCar</h1>

            <SignInForm/>

            <span>Não possui uma conta? <Link to="/sign-up" className="text-blue-600 hover:text-blue-500">Cadastre-se aqui</Link></span>

        </div>
        </div>
    )
}