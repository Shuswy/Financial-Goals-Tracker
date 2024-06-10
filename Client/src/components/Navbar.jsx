import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/dashboard');
  };

  return (
    <div className='flex justify-between text-neutral-content text-lg font-semibold w-full rounded-lg shadow-lg items-center bg-neutral h-[70px] px-8 mb-10'>
      <div className='flex w-[30%] justify-between'>
        <div className='cursor-pointer hover:text-gray-200' onClick={() => navigate('/')}>Budget Planner</div>
        <div className='cursor-pointer hover:text-gray-200' onClick={() => navigate('/dashboard')}>Dashboard</div>
      </div>
      {user ? (
        <div className='cursor-pointer hover:text-gray-200' onClick={() => setIsModalOpen(true)}>Log Out</div>
      ) : (
        <div className='cursor-pointer hover:text-gray-200' onClick={() => navigate('/register')}>Sign Up</div>
      )}

      {/* DaisyUI Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Logout</h3>
            <p className="py-4">Are you sure you want to log out?</p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleLogout}>Yes</button>
              <button className="btn" onClick={() => setIsModalOpen(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
