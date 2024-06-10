import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Named import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser({ id: decoded.id, username: decoded.username, email: decoded.email });
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser({ id: decoded.id, username: decoded.username, email: decoded.email });
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser({ id: decoded.id, username: decoded.username, email: decoded.email });
        } catch (error) {
            throw new Error('Registration failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
