import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores';
import { SideMenu, Spinner } from '../components';

export const DashboardLayout = () => {

  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  if(authStatus === 'pending') {
    checkAuthStatus();
    return <Spinner />
  }
  
  if(authStatus === 'unauthorized') return <Navigate to='/auth/login' />

  return (
    <div className="bg-slate-200 overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
      <div className="flex flex-row relative w-screen">
        <SideMenu />
        <div className="w-full p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};