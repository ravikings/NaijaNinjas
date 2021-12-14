import React, { useContext, useEffect, useState } from 'react';
import createRequest from '../../utils/axios';

export const AuthContext = React.createContext();

export function useUser() {
    return useContext(AuthContext);
}

function UserProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('idToken')) {
            createRequest()
                .get('api/v1/profile/')
                .then((res) => {
                    console.log(res?.data?.user);
                    setUser(res?.data?.user);
                    setIsAuthenticated(true);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, []);

    const signIn = (userDetails) => {
        setUser(userDetails);
        setIsAuthenticated(true);
    };

    const signOut = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export default UserProvider;
