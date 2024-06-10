import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let validationErrors = {};

        if (!emailRegex.test(email)) {
            validationErrors.email = 'Invalid email format.';
        }

        if (!passwordRegex.test(password)) {
            validationErrors.password = 'Password must be 6-12 characters long, contain at least one capital letter, and one number.';
        }

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await register(username, email, password);
            navigate('/dashboard');
        } catch (error) {
            setErrors({ api: error.message });
        }
    };

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col justify-top items-left w-[400px] h-[600px] bg-white rounded-lg shadow-lg p-4'>
                <h1 className="text-2xl font-bold mb-4">Register</h1>
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
                        <label className="block text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                    {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}
                    <button type="submit" className="btn btn-primary w-full">Register</button>
                    <div className="divider">Or</div>
                    <button type="button" className="btn btn-secondary w-full" onClick={() => navigate('/login')}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
