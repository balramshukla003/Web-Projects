import '../../css/ChattingUi.css';
import { CgCloseR } from 'react-icons/cg';
import { AiOutlineSend } from 'react-icons/ai';
import React, { useState, useRef, useEffect } from 'react';
import { useSelectedUser } from "../../context/SelectedUserProvider.jsx";


const ChattingUi = () => {


    const imageUrl = "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png";
    const { selectedUserId, setSelectedUserId } = useSelectedUser();

    useEffect(() => {
        console.log('SelectedUser chatting Ui:', selectedUserId);
    }, [selectedUserId])

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const messageEndRef = useRef(null);

    // Scroll to the last message
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, { text: inputValue, sender: 'me' }]);
            setInputValue('');
        }
    };

    const handleMesssages = () => {
        setInputValue("");
        setMessages([]);
    }


    const handleUnselectUser = () => {
        setSelectedUserId("");
        handleMesssages();
    };
    
    useEffect(() => { handleMesssages(); }, [selectedUserId]);



    return (
        <div className="chatting-ui">
            <div className="message-area">
                {selectedUserId._id ? (
                    <>
                        {/* Selected User Details */}
                        <div className="selected-user-details-info">
                            <img
                                src={selectedUserId.profilePic || imageUrl}
                                alt="user-dp"
                                className="user-dp"
                            />
                            <span className="username">{selectedUserId.fullName}</span>
                            <CgCloseR className="close-chat" onClick={handleUnselectUser} />
                        </div>

                        {/* Messages List */}
                        <div className="message-list">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                                >
                                    {message.text}
                                </div>
                            ))}
                            <div ref={messageEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="message-input">
                            <input
                                type="text"
                                placeholder="Type your message here"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <AiOutlineSend className="send-icon" onClick={handleSendMessage} />
                        </div>
                    </>
                ) : (
                    <div className="select-user-prompt">
                        <p>Select a user to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChattingUi;