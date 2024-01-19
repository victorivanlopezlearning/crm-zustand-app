import {
  IoAccessibilityOutline,
  IoHeartOutline,
  IoInformationOutline,
  IoListOutline,
  IoLockClosedOutline,
  IoPawOutline
} from 'react-icons/io5';
import { RequestInfo, WhiteCard } from '../../components';
import { useBearStore, usePersonStore, useTaksStore } from '../../stores';

export const Dashboard = () => {

  const totalBears = useBearStore((store) => store.totalBears);
  const firstName = usePersonStore((store) => store.firstName);
  const totalTasks = useTaksStore((store) => store.totalTasks);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Información colectiva de varios stores de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <WhiteCard centered>
          <IoPawOutline size={50} className="text-indigo-600" />
          <h2>Osos</h2>
          <p>{totalBears()}</p>
        </WhiteCard>


        <WhiteCard centered>
          <IoAccessibilityOutline size={50} className="text-indigo-600" />
          <h2>Persona</h2>
          <p>{firstName}</p>
        </WhiteCard>


        <WhiteCard centered>
          <IoListOutline size={50} className="text-indigo-600" />
          <h2>Tareas</h2>
          <p>{totalTasks()}</p>
        </WhiteCard>


        <WhiteCard centered>
          <IoHeartOutline size={50} className="text-indigo-600" />
          <h2>Boda</h2>
          <p>Información</p>
        </WhiteCard>


        <WhiteCard centered>
          <IoLockClosedOutline size={50} className="text-indigo-600" />
          <h2>Auth</h2>
          <p>Información</p>
        </WhiteCard>

        <WhiteCard centered className='col-span-3'>
          <IoInformationOutline size={50} className="text-indigo-600" />
          <RequestInfo />
        </WhiteCard>
      </div>
    </>
  );
};