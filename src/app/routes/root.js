import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Auth from '../layouts/Auth'
import Main from '../layouts/Main'
import ConfirmEmailPage from '../components/pages/ConfirmEmailPage'
import ForgotPasswordPage from '../components/pages/ForgotPasswordPage'
import ResetPasswordPage from '../components/pages/ResetPasswordPage'
import sellerRoute from './sellerRoute'
import ChangePasswordPage from '../components/pages/ChangePasswordPage'
import ChangeEmailPage from '../components/pages/ChangeEmailPage'

const child =  sellerRoute

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: (
      <main style={{ padding: '1rem' }}>
        <p>There&apos;s nothing here!</p>
      </main>
    ),
    children: [...child]
  },
  {
    path: 'auth',
    element: <Auth />
  },
  {
    path: 'forgotPassword',
    element: <ForgotPasswordPage />
  },
  {
    path: 'resetPassword',
    element: <ResetPasswordPage />
  },
  {
    path: 'changePassword',
    element: <ChangePasswordPage />
  },
  {
    path: 'changeEmail',
    element: <ChangeEmailPage />
  },
  {
    path: 'register/email-confirmation',
    element: <ConfirmEmailPage />
  }
])

export default routes
