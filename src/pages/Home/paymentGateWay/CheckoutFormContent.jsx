import { CardElement, useElements, useStripe, } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaDollarSign, FaCreditCard, FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa'; // Icons for checkout form


const CheckoutFormContent = ({ itemsToCheckout, checkoutType, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); // Get axios instance for authenticated calls

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    zipCode: '',
    country: 'US'
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); // Default payment method
  const [processing, setProcessing] = useState(false); // State for payment processing
  const [cardError, setCardError] = useState(null); // State for Stripe CardElement errors


  // Handle form submission for checkout
  const handleSubmitCheckout = async (e) => {
    e.preventDefault();
    setProcessing(true); // Start processing

    // Basic validation for shipping address
    if (!shippingAddress.fullName || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.zipCode || !shippingAddress.country) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required shipping address fields.',
      });
      setProcessing(false); // Stop processing
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      setProcessing(false);
      return;
    }

    // Reset card error
    setCardError(null);

    // 1. Create Payment Method (client-side)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name: shippingAddress.fullName,
        email: user?.email, // Use user's email from auth
        address: {
          line1: shippingAddress.addressLine1,
          line2: shippingAddress.addressLine2,
          city: shippingAddress.city,
          postal_code: shippingAddress.zipCode,
          country: shippingAddress.country,
        },
      },
    });

    if (error) {
      console.error('[Stripe Error]', error);
      setCardError(error.message);
      setProcessing(false);
      Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: error.message || 'An error occurred with your card details.',
      });
      return;
    }

    // Display processing message
    Swal.fire({
      title: 'Processing Payment...',
      text: 'Please wait while your order is being processed.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

   
    // ---------------------------------------------------------------------------------------
    // Calling API For Payment Intent Where There Will Be The Client Secret Key For Deduction
    // ---------------------------------------------------------------------------------------
    try {
      const { data: clientSecretResponse } = await axiosSecure.post('/create-payment-intent', {
        amount: totalAmount * 100, 
        currency: 'usd', 
        items: itemsToCheckout.map(item => ({ 
            medicineId: item.medicineId, 
            quantity: item.quantity 
        })), 
        userId: user?.uid,
      });
      
      const clientSecret = clientSecretResponse.clientSecret;

      // ------------------------------------------------------------------------------------
      // 3. Confirm The Payment On The Client-Side Using The Client_Secret 
      // ------------------------------------------------------------------------------------
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: shippingAddress.fullName,
              email: user?.email,
            },
          },
        }
      );

    //   If Error From confirmCardPayment ----------------------------------------------------
      if (confirmError) {
        console.error('[Stripe Confirm Error]', confirmError);
        setCardError(confirmError.message);
        setProcessing(false);
        Swal.fire({
          icon: 'error',
          title: 'Payment Confirmation Failed',
          text: confirmError.message || 'Failed to confirm your payment. Please try again.',
        });
        return;
      }

    //   If Succeeded From confirmCardPayment ------------------------------------------------
      if (paymentIntent.status === 'succeeded') {
        console.log('Payment Succeeded:', paymentIntent);


      // ------------------------------------------------------------------------------------
      //  Sending Order Data To Backend For Finalization
      // ------------------------------------------------------------------------------------
        const orderData = {
          userId: user?.uid, // Use actual user ID
          userEmail: user?.email,
          userName: user?.displayName,
          items: itemsToCheckout.map(item => ({
            medicineId: item.medicineId,
            quantity: item.quantity,
            priceAtAddToCart: item.priceAtAddToCart,
            totalPricePerItem: item.totalPricePerItem,
            itemName: item.itemName,
            company: item.company,
          })),
          totalAmount: totalAmount,
          shippingAddress: shippingAddress,
          paymentMethod: "credit_card",
          checkoutType: checkoutType,
          paymentIntentId: paymentIntent.id, 
          transactionId: paymentIntent.id, 
          orderDate: new Date().toISOString(),
          status: 'pending',
        };

        // If payment method is Cash on Delivery, adjust status and payment details
        // if (paymentMethod === 'cash_on_delivery') {
        //     orderData.status = 'pending_cod'; // A specific status for COD
        //     orderData.paymentIntentId = 'N/A';
        //     orderData.transactionId = 'N/A';
        // }
        
        // API Call For Saving Order Data In The Database ----------------------------------
        const { data: orderResponse } = await axiosSecure.post('/process-order', orderData);

        // Positive Feedback When Saving In Database Completed ----------------------------
        if (orderResponse.success) {
          Swal.fire({
            icon: 'success',
            title: 'Order Placed!',
            text: `Your order for ${checkoutType} items has been placed successfully. Transaction ID: ${paymentIntent.id}`,
            confirmButtonText: 'OK',
          }).then(() => {
            navigate('/invoice', { state: { orderData: orderResponse.order } }); // Pass confirmed order data
          });
        } else {  // Negative Feedback When Saving In Databse Failed -----------------------
          Swal.fire({
            icon: 'error',
            title: 'Order Creation Failed',
            text: orderResponse.message || 'Failed to finalize your order on the server.',
          });
        }

      } else { // Negative Feedback When Payment Failed ------------------------------------
        
        Swal.fire({
          icon: 'info',
          title: 'Payment Status',
          text: `Payment status: ${paymentIntent.status}. Please try again or contact support.`,
        });
      }

    } catch (err) { // Negative Feedback When Payment Intent/Client Secret Key Not Generated 
      console.error('Checkout Error:', err.response?.data || err.message);
      setCardError(err.response?.data?.message || err.message || 'An unexpected error occurred during checkout.');
      Swal.fire({
        icon: 'error',
        title: 'Checkout Failed',
        text: err.response?.data?.message || 'An unexpected error occurred. Please try again.',
      });
    } finally { //Either Client Secret Key Got or Not Through Payment Intent ------------------ 
      setProcessing(false); // Stop processing in all cases
    }
  };

  // Handle Cash on Delivery submission
  const handleCashOnDeliverySubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Basic validation for shipping address
    if (!shippingAddress.fullName || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.zipCode || !shippingAddress.country) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required shipping address fields.',
      });
      setProcessing(false);
      return;
    }

    Swal.fire({
      title: 'Placing Order (Cash on Delivery)...',
      text: 'Please wait while your order is being processed.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
        const orderData = {
            userId: user?.uid,
            userEmail: user?.email,
            userName: user?.displayName,
            items: itemsToCheckout.map(item => ({
                medicineId: item.medicineId,
                quantity: item.quantity,
                priceAtAddToCart: item.priceAtAddToCart,
                totalPricePerItem: item.totalPricePerItem,
                itemName: item.itemName,
                company: item.company,
            })),
            totalAmount: totalAmount,
            shippingAddress: shippingAddress,
            paymentMethod: 'cash_on_delivery',
            checkoutType: checkoutType,
            paymentIntentId: 'N/A', // Not applicable for COD
            transactionId: 'N/A', // Not applicable for COD
            orderDate: new Date().toISOString(),
            status: 'pending_cod', // Specific status for COD
        };

        const { data: orderResponse } = await axiosSecure.post('/process-order', orderData);

        if (orderResponse.success) {
            Swal.fire({
                icon: 'success',
                title: 'Order Placed (COD)!',
                text: `Your Cash on Delivery order for ${checkoutType} items has been placed successfully.`,
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/order-confirmation', { state: { orderData: orderResponse.order } });
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Order Creation Failed',
                text: orderResponse.message || 'Failed to finalize your COD order on the server.',
            });
        }

    } catch (err) {
        console.error('COD Checkout Error:', err.response?.data || err.message);
        Swal.fire({
            icon: 'error',
            title: 'Checkout Failed',
            text: err.response?.data?.message || 'An unexpected error occurred during COD checkout. Please try again.',
        });
    } finally {
        setProcessing(false);
    }
  };


  return (
    <form onSubmit={paymentMethod === 'credit_card' ? handleSubmitCheckout : handleCashOnDeliverySubmit}>
      
        {/* ---------------------------------------------------------------------------------
        Cart Items In Card View
        --------------------------------------------------------------------------------- */}
      <div className="mb-8 border-b pb-6 border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaShoppingCart className="text-blue-500" /> Order Summary ({checkoutType} items)
        </h2>
        {/* Card of Items --------------------------------------------------------------- */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {itemsToCheckout.map((item) => (
            <div key={item.medicineId} className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm">
              <div className="flex items-center gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  className="w-12 h-12 object-cover rounded-md"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/48x48/E0E0E0/ADADAD?text=Img"; }}
                />
                <div>
                  <p className="font-medium text-gray-800">{item.itemName}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity} x ${item.priceAtAddToCart.toFixed(2)}</p>
                </div>
              </div>
              <span className="font-bold text-green-600">${item.totalPricePerItem.toFixed(2)}</span>
            </div>
          ))}
        </div>
        {/* Total Amount to Pay For Purchasing------------------------------------------- */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">Total Amount:</span>
          <span className="text-3xl font-extrabold text-green-700">${totalAmount.toFixed(2)}</span>
        </div>
      </div>


       {/* ---------------------------------------------------------------------------------
        Shipping Address Details
        --------------------------------------------------------------------------------- */}
      <div className="mb-8 border-b pb-6 border-gray-200">
        {/* Header ---------------------------------------------------------------------- */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-500" /> Shipping Address
        </h2>
        {/* Input Fields For Address ---------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name  */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={shippingAddress.fullName}
              onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
              required
            />
          </div>
          {/* Address Line 1 */}
          <div>
            <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
            <input
              type="text"
              id="addressLine1"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={shippingAddress.addressLine1}
              onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
              required
            />
          </div>
          {/* Address Line 2 */}
          <div>
            <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address Line 2 (Optional)</label>
            <input
              type="text"
              id="addressLine2"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={shippingAddress.addressLine2}
              onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
            />
          </div>
          {/* City Field */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
              required
            />
          </div>
          {/* Zip Code Field */}
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={shippingAddress.zipCode}
              onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
              required
            />
          </div>
          {/* Country Field */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
              required
            />
          </div>
        </div>
      </div>


       {/* ---------------------------------------------------------------------------------
        Payment Method Section
        --------------------------------------------------------------------------------- */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaCreditCard className="text-blue-500" /> Payment Method
        </h2>
        <div className="flex flex-col space-y-3">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              name="paymentMethod"
              value="credit_card"
              checked={paymentMethod === 'credit_card'}
              onChange={() => setPaymentMethod('credit_card')}
            />
            <span className="ml-2 text-gray-700 font-medium flex items-center gap-2">
              <FaCreditCard /> Credit/Debit Card
            </span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              name="paymentMethod"
              value="cash_on_delivery"
              checked={paymentMethod === 'cash_on_delivery'}
              onChange={() => setPaymentMethod('cash_on_delivery')}
            />
            <span className="ml-2 text-gray-700 font-medium flex items-center gap-2">
              <FaDollarSign /> Cash on Delivery
            </span>
          </label>
        </div>
      </div>


 {/* ---------------------------------------------------------------------------------
        Stripe Card Element
        --------------------------------------------------------------------------------- */}
      {paymentMethod === 'credit_card' && (
        <div className="mb-8 p-4 border border-gray-300 rounded-md shadow-sm">
          <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          {cardError && <p className="text-red-600 text-sm mt-2">{cardError}</p>}
        </div>
      )}

      {/* Final Checkout Button ------------------------------------------------------------*/}
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-3"
          disabled={processing || (paymentMethod === 'credit_card' && (!stripe || !elements))}
        >
          {processing ? 'Processing...' : `Pay Now ($${totalAmount.toFixed(2)})`}
        </button>
      </div>
    </form>
  );
};
export default CheckoutFormContent;