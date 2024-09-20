import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Signup from './Signup';

const LoginModal = ({ closeModal ,setModalOpen }) => {
  const [showSignup, setShowSignup] = useState(false);
  const toggleForm = () => setShowSignup(!showSignup);

  // Conditional height for the modal based on the form being shown
  const modalHeight = showSignup ? '' : '530px';

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className = "relative bg-white rounded-2xl shadow-lg w-full max-w-[1074px] md:h-auto h-[550px] flex"
        style={{ height: modalHeight }}
          >
        {/* <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button> */}
        {showSignup ? (
          <Signup toggleForm={toggleForm} />
        ) : (
          <Login toggleForm={toggleForm}  setModalOpen={setModalOpen}/>
        )}
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;


