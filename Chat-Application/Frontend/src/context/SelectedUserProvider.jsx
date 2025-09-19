import React, { useState, createContext, useContext, useEffect } from 'react';

const SelectedUserContext = createContext();

const SelectedUserProvider = ({ children }) => {

    const [selectedUserId, setSelectedUserId] = useState({});

    const SelectedUser = {
        selectedUserId,
        setSelectedUserId,
    };

    useEffect(() => {
        console.log('SelectedUser:', selectedUserId);
    }, [SelectedUser.setSelectedUserId])

    return (
        <SelectedUserContext.Provider value={SelectedUser}>
            {children}
        </SelectedUserContext.Provider>
    );
};


const useSelectedUser = () => {
    const context = useContext(SelectedUserContext);
    if (!context) {
        throw new Error('useSelectedUser must be used within a SelectedUserProvider');
    }
    return context;
};

export { SelectedUserProvider, useSelectedUser };
