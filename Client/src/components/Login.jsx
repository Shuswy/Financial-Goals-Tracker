import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    const navigate = useNavigate();

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col justify-top items-left w-[400px] h-[600px] bg-white rounded-lg shadow-lg p-4'>
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Login</button>
                    <div className="divider">Or</div>
                    <button className="btn btn-secondary w-full" onClick={() => navigate('/register')}>Register</button>
                    <p className='pt-8 pb-2 text-center font-semibold text-sm cursor-pointer hover:text-gray-500'>Forgot password?</p>
                </form>
            </div>
        </div>
    );
};

export default Login;
