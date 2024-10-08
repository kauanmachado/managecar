import { useState } from 'react';

export default function SoldCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    console.log("Carro vendido:", e.target.checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        id="sold-checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer"
      />
      <label htmlFor="sold-checkbox" className="text-gray-800 font-medium">
        Marcar como vendido
      </label>
    </div>
  );
}