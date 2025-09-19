import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const generateToken = (userData) => {
    if (!userData.fullName || !userData.email || !userData.phone || !userData.id) {
        console.error("Error: Missing required fields in userData object");
        return Promise.reject(new Error("Invalid userData object"));
    }

    return new Promise((resolve, reject) => {
        try {
            const token = jwt.sign(
                {
                    email: userData.email,
                    phone: userData.phone,
                    fullName: userData.fullName,
                    id: userData.id,
                },
                JWT_SECRET,
                { expiresIn: process.env.JWT_SECRET_EXPIRATION || '1h' }
            );

            if (!token) {
                return reject(new Error('Error generating token'));
            }

            resolve(token);
        } catch (error) {
            console.error("Error during token generation:", error.message);
            reject(error);
        }
    });
};

export default generateToken;