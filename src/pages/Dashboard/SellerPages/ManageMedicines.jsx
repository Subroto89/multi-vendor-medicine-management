import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router';
import AddMedicineModal from '../../../components/modals/AddMedicineModal';

const ManageMedicines = () => {
    const [isAddMedicineModal, setIsAddMedicineModal] = useState(false)
    const handleAddMedicineModal = ()=> {
        setIsAddMedicineModal(!isAddMedicineModal);
    }
    
    return (
        <div className='relative'>
            <div className='flex items-center justify-between'>
                <h2 className='text-lg font-bold text-gray-700'>Manage Your Medicine</h2>
                <Link onClick={handleAddMedicineModal} className='btn rounded-lg shadow-lg flex items-center gap-2 bg-green-500'><FaPlus size={20}/>Add New Medicine</Link>
            </div>

            <table>

            </table>


            {/* --------------------------------------------------------------------------------
            Add New Medicine Modal
            -------------------------------------------------------------------------------- */}
            {
                isAddMedicineModal && <AddMedicineModal handleAddMedicineModal={handleAddMedicineModal} />
            }
        </div>
    );
};

export default ManageMedicines;