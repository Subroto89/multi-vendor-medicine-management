import React from 'react';

const MedicineRow = ({medicine}) => {
    const {mediPhoto, medicineName, category, genericName, company, status} = medicine;
   
    return (
         <tr className="min-w-full divide-y divide-gray-200 text-gray-700 text-sm font-normal hover:bg-blue-50 transition-color duration-300">
                <td className="px-5 py-2 w-12 h-12 overflow-hidden"><img src={mediPhoto} alt="medicine photo" className='w-12 h-12'/></td>
                <td className="px-5 py-2 text-left">{medicineName}</td>
                <td className="px-5 py-2 text-left max-w-20 truncate">{category}</td>
                <td className="px-5 py-2 text-left w-20">{genericName}</td>
                <td className="px-5 py-2 text-left w-50 truncate">{company}</td>
                <td className="px-5 py-2 text-left">Stk field nai</td>
                <td className="px-5 py-2 text-left">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          status === 'active' ? 'bg-green-100 text-green-800' : 
          status === 'out_of_stock' ? 'bg-red-100 text-red-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
                </td>
                <td className="px-5 py-2 text-center">
                    <div className='flex items-center gap-2 '>
                        <button className='btn btn-outline btn-sm hover:bg-blue-500 hover:text-white'>Edit</button>
                        <button className='btn btn-outline btn-sm hover:bg-green-500 hover:text-white'>Re-stock</button>
                        <button className='btn btn-outline btn-sm hover:bg-gray-500 hover:text-white'>Details</button>
                        <button className='btn btn-outline btn-sm hover:bg-red-500 hover:text-white'>Delete</button>
                    </div>
                </td>
            </tr>
    );
};

export default MedicineRow;