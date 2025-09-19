import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_BACKEND_BASE_URL === 'production' ? undefined : 'http://localhost:3000';

const socket = io(URL, {
    autoConnect: false,
});

export const socketConnection = async (userData) => {
    const [connected, setConnected] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            console.log("[DEBUG] Connected to server:", socket.id);
            setConnected(true);

            // Emit the `user:connect` event with user data
            if (userData) {
                socket.emit("user:connect", userData);
            }
        });

        // Handle the `user:connected` acknowledgment
        socket.on("user:connected", (response) => {
            console.log("[DEBUG] User connected response:", response);
        });

        // Handle updates to the active users
        socket.on("users:update", (users) => {
            console.log("[DEBUG] Active users updated:", users);
            setActiveUsers(users);
        });

        // Handle socket disconnection
        socket.on("disconnect", () => {
            console.log("[DEBUG] Disconnected from server");
            setConnected(false);
        });

        // Cleanup event listeners when the component unmounts
        return () => {
            socket.off("connect");
            socket.off("user:connected");
            socket.off("users:update");
            socket.off("disconnect");
            socket.disconnect(); // Ensure the socket disconnects
        };
    }, [userData]);

    return { connected, activeUsers };
};

