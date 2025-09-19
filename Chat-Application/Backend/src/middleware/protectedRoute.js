import verifyTKN from '../jwt/verifyTKN.js';

export const protectedRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.error("Authorization header missing or invalid format.");
            return res.status(401).json({
                status: 'error',
                message: 'Access denied. No token provided or invalid format.'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            console.error("Token not found in Authorization header.");
            return res.status(401).json({
                status: 'error',
                message: 'Access denied. Token missing in authorization header.'
            });
        }

        const result = await verifyTKN(token);

        if (result.status !== 200) {
            console.error(`Token verification failed: ${result.message}`);
            return res.status(401).json({
                status: 'error',
                message: `Token verification failed: ${result.message}`
            });
        }
        req.user = result.decoded;
        next();

    } catch (error) {
        console.error("Error in protectedRoute:", error.message);
        return res.status(500).json({
            status: 'error',
            message: "Server Error. Please try again later."
        });
    }
};
