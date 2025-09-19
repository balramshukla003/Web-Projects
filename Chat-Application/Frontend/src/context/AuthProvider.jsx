import 'react-toastify/dist/ReactToastify.css';
import React, { useState, createContext, useContext, useEffect } from 'react';

import { io } from "socket.io-client";
import Loader from '../component/Loader.jsx';


const socket = io(import.meta.env.VITE_BACKEND_BASE_URL);
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);

    const [authUser, setAuthUser] = useState(null);

    const [userLoggedIn, setUserLoggedIn] = useState(false);

    async function callProtectedEndpoint() {

        const token = localStorage.getItem("Chat-Application-Token");

        if (!token) {
            console.log("No token found in local storage");
            return;
        }

        const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

        setLoading(true);

        try {
            const response = await fetch(`${backendURL}/api/auth/check`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
                return;
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                console.log("User authenticated:", result.data);
                setUserLoggedIn(true);
                setAuthUser(result.data);
            } else {
                console.error("Response is not JSON:", response);
            }
        } catch (error) {
            console.error("Error calling protected endpoint:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        callProtectedEndpoint();
    }, []);

    const Auth = {
        authUser,
        setAuthUser,
        userLoggedIn,
        setUserLoggedIn,
    };


    useEffect(() => {
        console.log("After update auth user: ", Auth.authUser);
    }, [Auth.authUser])


    if (loading) {
        return <Loader />;
    }


    return <AuthContext.Provider value={Auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
