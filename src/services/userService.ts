// services/userService.ts
import axios from 'axios';
import { encryptWithRsa, generateSignature } from './encryptionService';

const API_URL = 'https://cc3e497d.qdhgtch.com:2345/api/';

const loginUser = async (username: string, password: string) => {
    const formData = {
        username,
        password,
        timestamp: new Date().getTime(),
    };

    const encryptedData = encryptWithRsa(JSON.stringify(formData));
    const signature = generateSignature(encryptedData);

    try {
        const response = await axios.post(`${API_URL}/v1/user/login`, {
            pack: encryptedData,
            signature,
        });

        // Handle response as needed
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error; // Rethrow or handle as necessary
    }
};

export { loginUser };
