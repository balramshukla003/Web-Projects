import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

async function verifyTKN(token) {
    try {
        const decoded = await jwt.verify(token, secretKey);
        return {
            status: 200,
            decoded,
            message: 'Token is valid.'
        };
    } catch (err) {
        console.error(`JWT verification error: ${err.message}`);
        return {
            status: 401,
            message: `${err.message || "Invalid or expired token."}`
        };
    }
}

export default verifyTKN;
