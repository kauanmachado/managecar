import { useState } from "react";
import { FaCar, FaChevronLeft, FaChevronRight, FaMoneyBillWave, FaPlus, FaUser, FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from '../assets/imgs/logo_managecar.png'
import { BiPlus } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`shadow bg-white text-white ${isOpen ? 'w-[300px]' : 'w-16'} h-[100vh]transition-all duration-300 ease-in-out`}>
      <div className="flex justify-end p-4">
        
        <button onClick={toggleSidebar} className="focus:outline-none text-gray-900">
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      <nav className="p-4 gap-4 text-gray-900">
      
        <ul className="">
          <li className="py-2">
            <Link to="/dashboard" className="flex items-center block hover:bg-gray-100 transition-all rounded-md p-2 gap-4">
              <FaUser />
              {isOpen && "Geral"}
            </Link>
          </li>
    
          <li className="py-2">
            <Link to="/stock"  className="flex items-center block hover:bg-gray-100 transition-all rounded-md p-2 gap-4">
              <FaCar />
              {isOpen && "Estoque"}
            </Link>
          </li>

          <li className="py-2">
            <Link to="/add-car"  className="flex items-center block hover:bg-gray-100 transition-all rounded-md p-2 gap-4">
              <FaPlus />
              {isOpen && "Adicionar carro"}
            </Link>
          </li>
          
          <li className="py-2">
            <Link to="/sold"  className="flex items-center block hover:bg-gray-100 transition-all rounded-md p-2 gap-4">
            <FaMoneyBillWave />
              {isOpen && "Vendidos"}
            </Link>
          </li>
          
          <li className="py-2">
            <Link to="/update-user"  className="flex items-center block hover:bg-gray-100 transition-all rounded-md p-2 gap-4">
              <FaUserEdit />
              {isOpen && "Atualizar dados"}
            </Link>
          </li>
          
        </ul>
        <hr></hr>
        <Link to="/update-user"  className="flex items-center block hover:bg-red-100 transition-all rounded-md p-2 gap-4 text-red-500 mt-4">
          <IoMdLogOut />
              {isOpen && "Sair da conta"}
            </Link>
      </nav>
    </div>
  );
}
