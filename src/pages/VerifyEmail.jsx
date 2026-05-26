import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmVerification = async () => {
      try {
        // Fires an invisible background call directly to your backend API
        const response = await axios.get(`https://sehatsetu-backend-8um0.onrender.com/api/auth/verify/${token}`);
        
        if (response.data.success) {
          setStatus('success');
          // Automatically route them to login after 3 seconds of success
          setTimeout(() => {
            navigate('/login?verified=true');
          }, 3000);
        }
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Verification link is invalid or expired.');
      }
    };

    if (token) confirmVerification();
  }, [token, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0fdf4' }}>
      <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        {status === 'verifying' && (
          <div>
            <h2 style={{ color: '#16a34a' }}>🌿 Verifying Your Account...</h2>
            <p style={{ color: '#666' }}>Connecting to SehatSetu secure servers.</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <h2 style={{ color: '#15803d' }}>✅ Verification Successful!</h2>
            <p style={{ color: '#666' }}>Your account is now active. Redirecting you to the login screen...</p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <h2 style={{ color: '#dc2626' }}>❌ Verification Failed</h2>
            <p style={{ color: '#666' }}>{message}</p>
            <button onClick={() => navigate('/register')} style={{ marginTop: '15px', background: '#15803d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Back to Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;