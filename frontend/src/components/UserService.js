import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const getUsers = () => {
    return axios.get(API_URL);
};

const createUser = (user) => {
    return axios.post(API_URL, user);
};

const updateUser = (id, user) => {
    return axios.put(`${API_URL}/${id}`, user);
};

const deleteUser = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export default {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};
