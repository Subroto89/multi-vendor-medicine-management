import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import DataNotFound from '../../components/shared/DataNotFound';
import { FaTools } from 'react-icons/fa';
import Container from '../../components/shared/Container';
import ShopMedicineRow from '../../components/shopMedicineRow';
import { useState } from 'react';
import ShopModal from '../../components/modals/ShopModal';

const Shop = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [targetMedicine, setTargetMedicine] = useState(null)


  const handleModalView = () => {
    setIsModalOpen(!isModalOpen)
  }




  const {data: allMedicines, isLoading} = useQuery({
      queryKey: ["allMedicines"],
      queryFn: async () => {
        const {data} = await axiosSecure('/get-medicines');
        return data;
      }
  })

  if(isLoading) return <LoadingSpinner/>
    return (
        <div className='text-gray-400 text-xl'>
         <Container>
           <div>
            <h2 className='text-3xl font-bold text-gray-700 mb-4'>All Medicines in Different Categories </h2>
          </div>

          <div>
             {allMedicines.length > 0 ? (
            <div className="w-full rounded-lg overflow-auto shadow-lg">
              <table className="w-full divider-y divider-gray-300">
                <thead className="bg-gray-50 text-gray-700 text-md font-semibold">
                  <tr>
                    <th className="px-5 py-2 text-left">Medicine Name</th>
                    <th className="px-5 py-2 text-left">Generic Name</th>
                    <th className="px-5 py-2 text-left">Company</th>
                    <th className="px-5 py-2 text-left">Status</th>
                    <th className="pr-5 py-2 text-left">Stock</th>
                    <th className="px-5 py-2 text-left">Unit Price</th>
                    <th className="px-5 py-2 text-center flex items-center gap-3">
                      <FaTools />
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100 text-gray-800">
                  {allMedicines.map((medicine) => (
                    <ShopMedicineRow
                      key={medicine._id}
                      medicine={medicine}
                      handleModalView={handleModalView}
                      setTargetMedicine={setTargetMedicine} 
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <DataNotFound
              message={
                "No medicines available! Please check back later."
              }
            />
          )}
          </div>





          {
            isModalOpen && <ShopModal targetMedicine={targetMedicine} handleModalView={handleModalView} />
          }
         </Container>
        </div>
    );
};

export default Shop;