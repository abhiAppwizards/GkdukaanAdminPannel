import React, { useState } from 'react'
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
  CCardGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import config from 'src/config'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPhone } from 'react-icons/fa'


const Register = () => {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [repeatPassword, setRepeatPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  const isValidEmail = (value) => {
    // Simple email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  const handleRegister = () => {
    setLoading(true)
    setError(null)

    // Regular expression to allow only letters and spaces
    const nameRegex = /^[a-zA-Z\s]*$/

    if (
      !admin.trim() ||
      !email.trim() ||
      !password.trim() ||
      !repeatPassword.trim() ||
      !phoneNumber.trim()
    ) {
      setError('Please fill all the fields.')
      setLoading(false)
      return
    } else if (!nameRegex.test(admin.trim())) {
      setError('Name field should contain only letters and spaces.')
      setLoading(false)
      return
    }

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setLoading(false)
    } else {
      fetch(`${config.baseURL}/admin/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminName: admin,
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        }),
      })
        .then(async (response) => {
          const data = await response.json()
          if (data.success !== true) {
            throw new Error(
              data.message || 'Registration failed. Please check your details and try again.',
            )
          }
          return data
        })
        .then((data) => {
          toast.success('Registration successful!', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        })
        .catch((error) => {
          setError(error.message)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard>
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Register</h1>
                    <p className="text-body-secondary">Admin - Create your account</p>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    {successMessage && (
                      <div className="alert alert-success" role="alert">
                        {successMessage}
                      </div>
                    )}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Your Name"
                        autoComplete="name"
                        value={admin}
                        onChange={(e) => setAdmin(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <FaPhone />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Phone Number"
                        autoComplete="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton disabled={loading} color="success" onClick={handleRegister}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5">
                <CCardBody className="p-4">
                  <div>
                    <h2>Log In</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/login">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Log In
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
