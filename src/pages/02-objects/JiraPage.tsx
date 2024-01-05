import { JiraTasks } from '../../components';
import { useTaksStore } from '../../stores';

export const JiraPage = () => {

  const pendingTasks = useTaksStore((state) => state.getTaskByStatus('open'));
  const inProgressTasks = useTaksStore((state) => state.getTaskByStatus('in-progress'));
  const doneTasks = useTaksStore((state) => state.getTaskByStatus('done'));

  return (
    <>
      <h1>Tareas</h1>
      <p className='border-b border-gray-300 p-2 mb-4'>Manejo de estado con objectos de Zustand</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title='Pendientes' value='open' tasks={pendingTasks} />

        <JiraTasks title='Avanzando' value='in-progress' tasks={inProgressTasks} />

        <JiraTasks title='Terminadas' value='done' tasks={doneTasks} />
      </div>
    </>
  );
};