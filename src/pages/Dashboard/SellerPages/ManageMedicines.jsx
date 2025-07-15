import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router';
import AddMedicineModal from '../../../components/modals/AddMedicineModal';
import Container from '../../../components/shared/Container';
import ParticularSellerMedicines from '../../../components/ParticularSellerMedicines';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';

const ManageMedicines = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    // ---------------------------------------------------------------------------------------
    // Add Medicine Modal Opening State
    // ---------------------------------------------------------------------------------------
    const [isAddMedicineModal, setIsAddMedicineModal] = useState(false)
    const handleAddMedicineModal = ()=> {
        setIsAddMedicineModal(!isAddMedicineModal);
    }







     const {
        data: medicines = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ["particularSellerMedicines", user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure(`/get-medicines/${user.email}`);
          return data;
        },
         enabled: !!user?.email
      });
    
      if (isLoading) return <LoadingSpinner />;
    
    return (
        <div className='relative'>
           <Container>
            {/* --------------------------------------------------------------------------------
            Button To Open Add New Medicine Modal 
            -------------------------------------------------------------------------------- */}
             <div className='flex items-center justify-between'>
                <h2 className='text-lg font-bold text-gray-700'>Manage Your Medicine</h2>
                <Link onClick={handleAddMedicineModal} className='btn rounded-lg shadow-lg flex items-center gap-2 bg-green-500'><FaPlus size={20}/>Add New Medicine</Link>
            </div>
            
            {/* --------------------------------------------------------------------------------
            All the Added Medicine Display Table
            -------------------------------------------------------------------------------- */}
            <div className='my-4'>
                
                <ParticularSellerMedicines medicines={medicines} refetch={refetch}/>
            </div>



            {/* --------------------------------------------------------------------------------
            Add New Medicine Modal
            -------------------------------------------------------------------------------- */}
            {
                isAddMedicineModal && <AddMedicineModal handleAddMedicineModal={handleAddMedicineModal} refetch={refetch}/>
            }
           </Container>
        </div>
    );
};

export default ManageMedicines;