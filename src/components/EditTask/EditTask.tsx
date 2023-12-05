import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { updateTaskAC } from "../../redux/todosReducer";
import { typeOptions } from "../../utils/helpers";
import { Task } from "../../utils/types";
import './EditTask.scss';

type Props = {
  task: Task;
  date: string;
  onClose: () => void;
}

export const EditTask: React.FC<Props> = ({ task, date, onClose }) => {
  const dispatch = useAppDispatch();
  const [newLabel, setNewLabel] = useState(task.type);
  const [newTask, setNewTask] = useState(task.task);

  const saveTaskHandler = () => {
    if (!newTask.trim()) {
      return;
    }

    const updatedTask: Task = {
      ...task,
      task: newTask,
      type: newLabel,
    }

    onClose();
    dispatch(updateTaskAC(date, updatedTask));
  }

  return (
    <div className="modal">
      <select
        value={newLabel}
        onChange={e => setNewLabel(e.target.value)}
        className="mb10"
      >
        {typeOptions.map(option => (
          <option key={option.id} value={option.id}>
            {option.option}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="mb10"
        placeholder="Search tasks..."
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />

      <button
        className="btn btn-primary btn-block"
        onClick={saveTaskHandler}
        disabled={!newTask.trim()}
      >
        Save
      </button>
    </div>
  );
}
