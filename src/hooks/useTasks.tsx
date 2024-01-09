import { DragEvent, useState } from 'react';
import Swal from 'sweetalert2';
import { useTaksStore } from '../stores';
import { TaskStatus } from '../interfaces';

interface Options {
  status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {

  const isDragging = useTaksStore((state) => !!(state.draggingTaskId));
  const onTaskDrop = useTaksStore((state) => state.onTaskDrop);
  const addTask = useTaksStore((state) => state.addTask);
  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {

    const { isConfirmed, value } = await Swal.fire({
      title: 'Nueva tarea',
      input: 'text',
      inputPlaceholder: 'Ingrese el nombre de la tarea',
      confirmButtonText: 'Crear tarea',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debe de ingresar un nombre para la tarea.'
        }
      }
    });

    if (isConfirmed) {
      addTask(value, status);
    }

  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  }
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
  }
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  }

  return {
    isDragging,
    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
