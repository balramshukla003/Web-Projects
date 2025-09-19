import jwt from 'jsonwebtoken';

export const generateToken = (userID, res) => {

    const token = jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie("jwt-token", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });

    return token;
}