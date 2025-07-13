import React from 'react';

const MedicineRow = ({medicine}) => {
    const {mediPhoto, medicineName, category, genericName, company, status} = medicine;
   
    return (
         <tr className="min-w-full divide-y divide-gray-200 text-gray-700 text-sm font-normal hover:bg-blue-50 transition-color duration-300">
                <td className="px-5 py-2 w-12 h-12 overflow-hidden"><img src={mediPhoto} alt="medicine photo" className='w-12 h-12'/></td>
                <td className="px-5 py-2 text-center">{medicineName}</td>
                <td className="px-5 py-2 text-center w-20">{category}</td>
                <td className="px-5 py-2 text-center w-20">{genericName}</td>
                <td className="px-5 py-2 text-center w-50 truncate">{company}</td>
                <td className="px-5 py-2 text-center">ne</td>
                <td className="px-5 py-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          status === 'active' ? 'bg-green-100 text-green-800' : 
          status === 'out_of_stock' ? 'bg-red-100 text-red-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
                </td>
                <td className="px-5 py-2 text-center">
                    <div className='flex items-center gap-3'>
                        <button className='btn'>Edit</button>
                        <button className='btn'>Re-stock</button>
                        <button className='btn'>Details</button>
                        <button className='btn'>Delete</button>
                    </div>
                </td>
            </tr>
    );
};

export default MedicineRow;