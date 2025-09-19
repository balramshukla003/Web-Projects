import React from "react";
import useSocket from "../hooks/useSocket.jsx"; // Adjust the path based on your project structure
import { useAuth } from "../context/AuthProvider.jsx"; // Assuming you have a context for auth

const SocketExample = () => {
    const { authUser } = useAuth(); // Fetch authenticated user data
    const { connected, activeUsers } = useSocket(authUser); // Use the custom hook

    return (
        <div>
            <h1>Socket.IO User Connection Example</h1>
            <p>Connection Status: {connected ? "Connected" : "Disconnected"}</p>
            <h2>Active Users:</h2>
            <ul>
                {activeUsers.map((user, index) => (
                    <li key={index}>
                        <strong>{user.userId}</strong> ({user.email}) - Status: {user.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SocketExample;
