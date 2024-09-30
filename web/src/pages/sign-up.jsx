import { Link } from 'react-router-dom'
import RegisterUserForm from '../components/forms/register-user'

export default function SignUp() {
    return (
        <div className="flex flex-col shadow rounded md:w-[600px] p-12 gap-4">
            <h1 className="font-bold text-2xl">Preencha seus dados de cadastro</h1>

            <RegisterUserForm/>

            <span>Já possui uma conta? <Link to="/" className="text-blue-600 hover:text-blue-500">Entre aqui</Link></span>
        </div>
    )
}