import "../../css/ChatSideBar.css";
import ChattingUi from "./ChattingUi.jsx";
import { CgClose } from "react-icons/cg";
import { IoReorderThree } from "react-icons/io5";
import useSocket from '../../hooks/useSocket.jsx';
import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../service/DB.Service.";
import { useAuth } from '../../context/AuthProvider.jsx';
import { useSelectedUser } from "../../context/SelectedUserProvider.jsx";

const ChatSideBar = () => {

    const { authUser } = useAuth();
    const { selectedUserId, setSelectedUserId } = useSelectedUser();
    const { connected, activeUsers } = useSocket(authUser);


    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [searchUser, setSearchUser] = useState("");
    const [allUsers, setAllUsers] = useState([]);


    const imageUrl = "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png";

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchAllUsers();
                setAllUsers(response || []);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchUsers();
        const interval = setInterval(fetchUsers, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const handleUserClick = (user) => {
        console.log("Selected User:", user);
        setSelectedUserId(user);
        <ChattingUi />
    };

    const filteredUsers = allUsers.filter((user) => {
        const matchesSearch = user.fullName.toLowerCase().includes(searchUser.toLowerCase());
        const isActive = activeUsers.some(
            (activeUser) => activeUser.id === user._id || activeUser.userID === user._id
        );
        return matchesSearch && (!isToggled || isActive);
    });

    return (
        <>
            <div
                className={`hamburger-menu ${isCollapsed ? "open" : ""}`}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >{isCollapsed ? <CgClose size={30} /> : <IoReorderThree size={35} />}
            </div>

            <div className={`chat-container ${isCollapsed ? "collapsed" : ""}`}>
                <div className="user-area">
                    <div className="search-inputs">
                        <input
                            type="text"
                            placeholder="Search users"
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)}
                        />
                    </div>
                    <p className="active-user">
                        Show active users
                        <button
                            className={`toggle-button ${isToggled ? "toggled" : ""}`}
                            onClick={() => setIsToggled(!isToggled)}
                            aria-label="Toggle active users"
                        >
                            <div
                                className={`toggle-circle ${isToggled ? "circle-toggled" : ""}`}
                            ></div>
                        </button>
                    </p>
                    <div className="all-users">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div
                                    className={`user ${selectedUserId._id === user._id ? "selected" : ""}`} // Add class if selected
                                    key={user._id}
                                    onClick={() => handleUserClick(user)} // Added onClick handler
                                >
                                    <div className="profile">
                                        <img src={imageUrl} alt={`${user.fullName}'s profile`} />
                                        <span
                                            className={
                                                activeUsers.some(
                                                    (activeUser) =>
                                                        activeUser.id === user._id ||
                                                        activeUser.userID === user._id
                                                )
                                                    ? "status-indicator"
                                                    : "online"
                                            }
                                        ></span>
                                    </div>
                                    <div className="details">
                                        <h3>{user.fullName}</h3>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-users">No users found</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatSideBar;
