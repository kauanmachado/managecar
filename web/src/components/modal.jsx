import React from 'react';

export default function Modal({ isOpen, onClose, car }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-600">Informações do</h2>
         
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            X
          </button>
        </div>
        <h4 className="text-lg font-bold mb-4">{car.brand} {car.model}</h4>

        <div className="space-y-2">
          <div>
            <p className="font-bold">Ano</p>
            <p>{car.year}</p>
          </div>
          <div>
            <p className="font-bold">Motor</p>
            <p>{car.motor}</p>
          </div>
          <div>
            <p className="font-bold">Quilometragem</p>
            <p>{car.kilometer} km</p>
          </div>
          <div>
            <p className="font-bold">Tipo de combustível</p>
            <p>{car.fuelType}</p>
          </div>
          <div>
            <p className="font-bold">Cor</p>
            <p>{car.color}</p>
          </div>
          <div>
            <p className="font-bold">Preço</p>
            <p>R$ {car.price.toFixed(2)}</p>
          </div>
          <div>
            <p className="font-bold">Condição</p>
            <p>{car.condition}</p>
          </div>
        </div>

        {/* Modal footer */}
        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full bg-indigo-800 hover:bg-indigo-900 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
