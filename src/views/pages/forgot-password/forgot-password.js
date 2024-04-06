import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import config from 'src/config';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    setLoading(true);
    fetch(`${config.baseURL}/admin/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to reset password');
        }
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        navigate('/reset-password');
      })
      .catch((error) => {
        console.error('Forgot password error:', error);
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1 className="mb-3">Forgot Password</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  {error && <p className="text-danger">{error}</p>}
                  <CRow>
                    <CCol xs={6}>
                      <CButton
                        color="primary"
                        className="px-4 text-black"
                        onClick={handleForgotPassword}
                        disabled={loading}
                      >
                        Forgot Password
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ForgotPassword;
