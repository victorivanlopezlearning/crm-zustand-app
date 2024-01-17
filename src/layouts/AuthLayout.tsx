
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-full md:max-w-lg px-8">
        <Outlet />
      </div>
    </div>
  );
};