import logo from '../assets/imgs/logo_managecar.png'

export default function Navbar(){
    return (
        <header className="w-full bg-white shadow-lg p-6 bg-white z-10">
            <div className="grid grid-cols-3">

                <div className="flex justify-center items-center">
                    <img src={logo} className="w-[80px]"></img>
                </div>

                <div className="flex justify-center items-center">
                    <p className="text-gray-500 text-sm">Gerencie seu estoque de carros de forma fácil e intuitiva.</p>
                </div>

                <div className="flex justify-center items-center">
                    <p className="text-end">Bem-vindo! <p className="font-bold text-indigo-800">Stock Carros</p></p>
                </div>


            </div>
        </header>
    )
}