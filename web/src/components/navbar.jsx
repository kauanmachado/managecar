import logo from '../assets/imgs/logo_managecar.png'

export default function Navbar(){
    return (
        <header className="w-full shadow p-8 bg-white">
            <div className="grid grid-cols-2">

                <div className="flex justify-center items-center">
                    <img src={logo} className="w-[100px]"></img>
                </div>

                <div className="flex justify-center items-center">
                    <p className="text-red-500 font-bold">Fazer logout</p>
                </div>

            </div>
        </header>
    )
}