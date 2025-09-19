import React from 'react'
import '../../css/ChatUiHeader.css'

import { FiLogOut } from "react-icons/fi";
import { FaRocketchat } from "react-icons/fa";
import { useAuth } from '../../context/AuthProvider.jsx'
import useSocket from '../../hooks/useSocket.jsx'

const ChatHeader = () => {

    const { setUserLoggedIn, authUser, setAuthUser } = useAuth();
    const { connected, activeUsers } = useSocket(authUser);

    const activeUsersCount = activeUsers.length || 0;

    const HandleLogout = () => {
        setUserLoggedIn(false);
        setAuthUser(null);
        localStorage.removeItem('Chat-Application-Token')
        window.location.reload();
    }


    return (
        <div className="chat-ui-header">
            <h2><FaRocketchat color="blue" size={45} cursor={"pointer"} onClick={() => { window.location.reload(); }} />ChatApp</h2>
            <div className="login-user-info">
                <div className="active-counter">
                    <span className="active-dot"></span>
                    <span>{activeUsersCount} active</span>
                </div>
                <p style={{ maxWidth: "100px" }}  > {authUser?.fullName || 'Guest'} </p>
                <FiLogOut size={23} color="#333" cursor="pointer" title="Logout" onClick={HandleLogout} />
            </div>
        </div>
    )
}

export default ChatHeader;
