import axios from "axios";

const API_URL = "/api/users/";

// Get all users

const getUsers = async (token) => {
    const response = await axios.get(`${API_URL}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

const updateUser = async (id, data, token) => {
    const response = await axios.put(`${API_URL}${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    return response.data;
}

// Get user by id
const getUserById = async (id,token) => {
    const response = await axios.get(`${API_URL}${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

const userService = {
    getUsers,
    getUserById,
    updateUser
};

export default userService;