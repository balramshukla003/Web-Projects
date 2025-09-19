import '../css/Chatui.css'
import React from 'react'
import ChatHeader from './Chat Ui/ChatHeader.jsx'
import ChatSideBar from './Chat Ui/ChatSideBar.jsx'
import ChattingUi from './Chat Ui/ChattingUi.jsx'
import { SelectedUserProvider } from '../context/SelectedUserProvider.jsx'
import { useAuth } from '../context/AuthProvider.jsx'

const ChatUi = () => {

    const { userLoggedIn } = useAuth();

    return (
        <SelectedUserProvider>
            <div className='outer-chat-ui'>
                <div className='inner-chat-ui'>
                    <ChatHeader />
                    <div className="chat-containers">
                        <ChatSideBar />
                        <ChattingUi />
                    </div>

                </div>
            </div>
        </SelectedUserProvider>
    )
}

export default ChatUi
