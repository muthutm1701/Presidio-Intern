import React, { createContext, useContext, useState, useEffect } from 'react';
import {userServiceAPI, setupInterceptors, setApiToken } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await userServiceAPI.post('/auth/refresh');
                const { accessToken: newAccessToken } = response.data;
                const decodedToken = JSON.parse(atob(newAccessToken.split('.')[1]));
                console.log(decodedToken);
                setUser({ id: decodedToken.id, role: decodedToken.role });
                setAccessToken(newAccessToken);
                setApiToken(newAccessToken); 
            } catch (error) {
                console.log(error);
                setUser(null);
                setAccessToken(null);
                setApiToken(null);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        setAccessToken(token);
        setApiToken(token); 
    };

    const logout = async () => {
        try {
            await userServiceAPI.post('/auth/logout');
        } catch (error) {
            console.error("Logout API call failed", error);
        } finally {
            setUser(null);
            setAccessToken(null);
            setApiToken(null);
        }
    };

    const updateAccessToken = (token) => {
        setAccessToken(token);
        setApiToken(token);
    };
    
    const authContextValue = { user, accessToken, login, logout, setAccessToken: updateAccessToken, loading };
    setupInterceptors(authContextValue);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
