
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores';
import { Spinner } from '../components';

export const AuthLayout = () => {

  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  if(authStatus === 'pending') {
    checkAuthStatus();
    return <Spinner />
  }

  if(authStatus === 'authorized') return <Navigate to='/dashboard' />

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-full md:max-w-lg px-8">
        <Outlet />
      </div>
    </div>
  );
};