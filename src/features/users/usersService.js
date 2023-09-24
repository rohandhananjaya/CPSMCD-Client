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

const userService = {
    getUsers
};

export default userService;