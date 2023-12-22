import type { IconType } from 'react-icons';
import { IoSpeedometerOutline, IoPawOutline, IoLogOutOutline, IoHeartOutline, IoListOutline, IoAccessibilityOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import './SideMenu.css';
import { SideMenuItem } from './SideMenuItem';


interface MenuItem {
  title: string;
  subTitle: string;
  href: string;
  Icon: IconType;
}

const menuItems: MenuItem[] = [
  { title: 'Dashboard', subTitle: 'Visualizar data', href: '/dashboard', Icon: IoSpeedometerOutline },
  { title: 'Osos', subTitle: 'Manejador de osos', href: '/dashboard/bears', Icon: IoPawOutline },
  { title: 'Persona', subTitle: 'Nombre y apellido', href: '/dashboard/person', Icon: IoAccessibilityOutline },
  { title: 'Tareas', subTitle: 'Listado de tareas', href: '/dashboard/tasks', Icon: IoListOutline },
  { title: 'Boda', subTitle: 'Invitados a la boda', href: '/dashboard/wedding-invitation', Icon: IoHeartOutline },
];

export const SideMenu = () => {

  return (
    <div id="menu" className="bg-gray-900 min-h-screen z-10 text-slate-300 w-80 left-0 overflow-y-scroll">
      <div id="logo" className="my-4 px-6">
        {/* Title */}
        <h1 className="text-lg md:text-2xl font-bold text-white">
          CRM - VILGWeb
        </h1>
        <p className="text-slate-500 text-sm mt-1">Sistema para gestión de personal.</p>
      </div>

      {/* Menu Items */}
      <nav id="nav" className="w-full px-6 mt-10">
        {
          menuItems.map(item => (
            <SideMenuItem key={item.href} {...item} />
          ))
        }

        {/* Logout */}
        <NavLink to={'/auth/login'} className="mt-10">
          <div>
            <IoLogOutOutline />
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-slate-300 font-bold leading-5">Logout</span>
            <span className="text-sm text-slate-500 hidden md:block">Cerrar sesión</span>
          </div>
        </NavLink>
      </nav>
    </div>
  );
};