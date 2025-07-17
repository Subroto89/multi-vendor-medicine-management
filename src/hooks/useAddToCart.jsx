import Swal from "sweetalert2";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAddToCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const handleAddToCart = async (stockQuantity, _id) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Log In",
        text: "You need to be logged in to add items to your cart.",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const quantity = 1;
    if (stockQuantity < quantity) {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: "This medicine is currently out of stock or requested quantity is not available.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const cartData = {
      medicineId: _id,
      quantity: quantity,
      userEmail: user?.email,
      userId: user?.uid,
      userName: user?.displayName,
    };

    try {
      const { data } = await axiosSecure.post("/add-to-cart", cartData);

      if (data.insertedId || data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Added to Cart!",
          text: `The selected medicine has been added to your cart.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add",
          text: data.message || "Could not add item to cart. Please try again.",
          timer: 2000,
        });
      }
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "There was a problem adding to cart. Please try again.",
        timer: 2500,
      });
    }
  };
  return handleAddToCart;
};

export default useAddToCart;
