import { useState } from "react";
import { FaCar, FaChevronLeft, FaChevronRight, FaPlus, FaUser, FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from '../assets/imgs/logo_managecar.png'
import { BiPlus } from "react-icons/bi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`shadow bg-indigo-800 text-white ${isOpen ? 'w-[300px]' : 'w-16'} h-screen transition-all duration-300 ease-in-out`}>
      <div className="flex justify-end p-4">
        
        <button onClick={toggleSidebar} className="focus:outline-none text-white">
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      <nav className="p-4 gap-4 text-gray-200">
      
        <ul className=" font-bold">
          <li className="py-2">
            <Link to="/dashboard" className="flex items-center block hover:bg-indigo-900 transition-all rounded-md p-2 gap-4">
              <FaUser />
              {isOpen && "Geral"}
            </Link>
          </li>
    
          <li className="py-2">
            <Link to="/stock"  className="flex items-center block hover:bg-indigo-900 transition-all rounded-md p-2 gap-4">
              <FaCar />
              {isOpen && "Carros"}
            </Link>
          </li>

          <li className="py-2">
            <Link to="/add-car"  className="flex items-center block hover:bg-indigo-900 transition-all rounded-md p-2 gap-4">
              <FaPlus />
              {isOpen && "Adicionar carro"}
            </Link>
          </li>
          
          <li className="py-2">
            <Link to="/sold"  className="flex items-center block hover:bg-indigo-900 transition-all rounded-md p-2 gap-4">
              <FaCar />
              {isOpen && "Vendidos"}
            </Link>
          </li>
          
          <li className="py-2">
            <Link to="/update-user"  className="flex items-center block hover:bg-indigo-900 transition-all rounded-md p-2 gap-4">
              <FaUserEdit />
              {isOpen && "Atualizar dados"}
            </Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
}
