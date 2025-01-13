import axios from 'axios';

// Save a new user (POST)
export const saveUser = async (user) => {
    try {
        const response = await axios.post(
            'http://localhost:5001/api/users',
            {
                email: user.email,
                name: user.displayName,
                image: user.photoURL,
                uid: user.uid,
            },
            {
                withCredentials: true,
            }
        );
        console.log('User saved:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
};

// Check if user exists (GET)
export const checkUserExists = async (uid) => {
    try {
        const response = await axios.get(`http://localhost:5001/api/users/${uid}`, {
            withCredentials: true, // Optional, depending on your backend CORS config
        });
        console.log('User exists check:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
};


  