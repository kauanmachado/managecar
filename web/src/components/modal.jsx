import React from 'react';

export default function Modal({ isOpen, onClose, vehicle }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        {/* Modal header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Informações do Veículo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            X
          </button>
        </div>

        {/* Modal body - Vehicle Information */}
        <div className="space-y-2">
          <div>
            <p className="font-bold">Marca:</p>
            <p>{vehicle.brand}</p>
          </div>
          <div>
            <p className="font-bold">Modelo:</p>
            <p>{vehicle.model}</p>
          </div>
          <div>
            <p className="font-bold">Ano:</p>
            <p>{vehicle.year}</p>
          </div>
          <div>
            <p className="font-bold">Motor:</p>
            <p>{vehicle.motor}</p>
          </div>
          <div>
            <p className="font-bold">Condição:</p>
            <p>{vehicle.condition}</p>
          </div>
          <div>
            <p className="font-bold">Quilometragem:</p>
            <p>{vehicle.kilometer} km</p>
          </div>
          <div>
            <p className="font-bold">Tipo de combustível:</p>
            <p>{vehicle.fuelType}</p>
          </div>
          <div>
            <p className="font-bold">Cor externa:</p>
            <p>{vehicle.externalColor}</p>
          </div>
          <div>
            <p className="font-bold">Cor interna:</p>
            <p>{vehicle.internalColor}</p>
          </div>
          <div>
            <p className="font-bold">Preço:</p>
            <p>R$ {vehicle.price.toFixed(2)}</p>
          </div>
          <div>
            <p className="font-bold">Status:</p>
            <p>{vehicle.status}</p>
          </div>
        </div>

        {/* Modal footer */}
        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
