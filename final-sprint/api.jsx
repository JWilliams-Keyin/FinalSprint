import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const getProducts = () => axios.get(`${API_BASE_URL}/products`);

export const getProductDetails = (id) =>
  axios.get(`${API_BASE_URL}/products/${id}`);

export const getCartItems = () => axios.get(`${API_BASE_URL}/cart`);

export const addToCart = (item) => axios.post(`${API_BASE_URL}/cart`, item);

export const removeFromCart = (id) =>
  axios.delete(`${API_BASE_URL}/cart/${id}`);

const productDetails = {
  productId: "12345",
  quantity: 1,
};

addToCart(productDetails)
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Error:", error));

const productId = "12345";

removeFromCart(productId)
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Error:", error));

function addToCartWithDelay(product) {
  setTimeout(() => {
    addToCart(product)
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error:", error));
  }, 1000);
}

addToCartWithDelay(productDetails);
