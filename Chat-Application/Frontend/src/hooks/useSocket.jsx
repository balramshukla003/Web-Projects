import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (authUser) => {

    const [connected, setConnected] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:3000");

        if (authUser) {
            socket.on("connect", () => {
                setConnected(true);
                socket.emit("user:connect", authUser);
            });

            socket.on("user:connected", (response) => {
                if (!response.success) {
                    console.error("Failed to register user:", response.message);
                }
            });

            socket.on("users:update", (users) => setActiveUsers(users));

            socket.on("disconnect", () => setConnected(false));
        }

        return () => {
            socket.off("connect");
            socket.off("user:connected");
            socket.off("users:update");
            socket.off("disconnect");
        };
    }, [authUser]);

    console.log("connected : ", connected, " Active users : ", activeUsers)
    return { connected, activeUsers };
};

export default useSocket ;
