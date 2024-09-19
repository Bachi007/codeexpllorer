// ProtectedRoute.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

const ProtectedRoute = ({ children } : any) => {
  const { authenticated } = useAuth();

  useEffect(() => {
    if (!authenticated) {
      window.location.href = 'auth/login';
    }
  }, [authenticated]);

  return children;
};

export default ProtectedRoute;