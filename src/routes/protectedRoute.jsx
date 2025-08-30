import React from 'react'
import { Navigate } from 'react-router-dom'
import storage from '../utils/storage'

export default function ProtectedRoute({ allowedRoles, children }) {
  // Token & role check
  const token = storage.getItem('token')
  const user = storage.getItem('user') // Assume you store { role: 'owner' } after login

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />
  }

  return children
}
