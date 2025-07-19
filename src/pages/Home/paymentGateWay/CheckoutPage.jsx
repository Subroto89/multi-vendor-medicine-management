import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Container from '../../../components/shared/Container';
import DataNotFound from '../../../components/shared/DataNotFound';


// Stripe Imports
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutFormContent from './CheckoutFormContent';

// Replace with your actual Stripe Publishable Key
// You should get this from your environment variables (e.g., process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Publishable_Key); 



const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const itemsToCheckout = React.useMemo(() => location.state?.items || [], [location.state]);
  const checkoutType = location.state?.checkoutType || 'unknown';

  const [totalAmount, setTotalAmount] = useState(0);

  // Calculation For Total Amount To Pay ----------------------------------------------------
  useEffect(() => {
    const calculatedTotal = itemsToCheckout.reduce((sum, item) => sum + item.totalPricePerItem, 0);
    setTotalAmount(calculatedTotal);

    if (itemsToCheckout.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No Items to Checkout',
        text: 'Please select items from your cart to proceed to checkout.',
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        navigate('/cart');
      });
    }
  }, [itemsToCheckout, navigate]);

  if (itemsToCheckout.length === 0 && !location.state) {
    return <DataNotFound message="No items found for checkout. Please go back to your cart and select items." />;
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Proceed to Checkout
        </h1>

        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
          {/* Elements provider wraps the CheckoutFormContent */}
          <Elements stripe={stripePromise}>
            <CheckoutFormContent 
              itemsToCheckout={itemsToCheckout} 
              checkoutType={checkoutType} 
              totalAmount={totalAmount} 
            />
          </Elements>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
