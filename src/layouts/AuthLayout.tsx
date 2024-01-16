
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <Outlet />
      </div>
      <div className="w-1/2 h-screen hidden lg:flex lg:flex-col items-center justify-center bg-indigo-700"></div>
    </div>
  );
};