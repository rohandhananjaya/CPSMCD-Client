import axios from "axios";

const API_URL = "/api/crops/";

// Create new crop
const createCrop = async (cropData, token) => {
  const response = await axios.post(`${API_URL}`, cropData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get all crops
const getCrops = async (token) => {
  const response = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const cropService = {
    createCrop,
    getCrops
};

export default cropService;