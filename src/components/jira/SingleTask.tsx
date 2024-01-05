import { IoReorderTwoOutline } from 'react-icons/io5';
import { Task } from '../../interfaces';
import { useTaksStore } from '../../stores';

interface Props {
  task: Task;
}

export const SingleTask = ({ task }: Props) => {

  const setDraggingTaskId = useTaksStore((state) => state.setDraggingTaskId);
  const removeDraggingTaskId = useTaksStore((state) => state.removeDraggingTaskId);

  return (
    <div
      draggable
      className="mt-5 flex items-center justify-between p-2"
      onDragStart={() => setDraggingTaskId(task.id)}
      onDragEnd={() => removeDraggingTaskId()}
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">
          {task.title}
        </p>
      </div>
      <span className=" h-6 w-6 text-navy-700 cursor-grab">
        <IoReorderTwoOutline />
      </span>
    </div>
  )
}