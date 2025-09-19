import React, { useContext } from 'react'
import { useSelectedUser } from './SelectedUserProvider';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {

    const { selectedUserId, setSelectedUserId } = useContext(useSelectedUser);

    const [PreviousMessage, setPreviousMessage] = useState({});

    const PreviousMessages = {
        PreviousMessage,
        setPreviousMessage
    };

    return (
        <MessageContext.Provider value={PreviousMessages}>
            {children}
        </MessageContext.Provider>
    );
}

const previousMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('MessageContext must be used within a MessageProvider');
    }
    return context;
};


export default MessageProvider
