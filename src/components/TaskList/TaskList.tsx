import React from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../redux/hooks';
import './TaskList.scss';
import { Task } from '../../utils/types';

const getPerparedTasks = (tasks: Task[], query: string, label: string): Task[] => {
  let preparedTasks = [...tasks];
  const normalizedQuery = query.trim().toLowerCase();

  if (!!normalizedQuery) {
    preparedTasks = preparedTasks.filter(task => task.task.toLowerCase().includes(normalizedQuery));
  }

  if (label !== 'all') {
    preparedTasks = preparedTasks.filter(task => task.type === label);
  }

  return preparedTasks;
}

type Props = {
  dayKey: string;
}

export const TaskList: React.FC<Props> = ({ dayKey }) => {
  const tasks = useAppSelector(state => state.todos.items).find(task => task.date === dayKey)?.tasks || [];
  const { query, label } = useAppSelector(state => state.filters);
  const preparedTasks = getPerparedTasks(tasks, query, label);

  return (
    <div className={cn({
      'task-list': !!tasks.length,
    })}>
      {preparedTasks.map(task => (
        <span
          key={task.id}
          className="task-item"
          style={task.type ? {borderTop: `2px solid ${task.type}`} : {}}
        >
          {task.task}
        </span>
      ))}
    </div>
  )
}
