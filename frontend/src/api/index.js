import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchEmails = async (query) => {
    const response = await axios.get(`${API_BASE_URL}/emails`, { params: { query } });
    return response.data;
};

export const saveEmail = async (emailData) => {
    await axios.post(`${API_BASE_URL}/emails`, emailData);
};
