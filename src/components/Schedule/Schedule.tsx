import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addTodoAC, removeTodoAC, setReorderedTasks } from '../../redux/todosReducer';
import './Schedule.scss';
import { typeOptions } from '../../utils/helpers';
import { Task } from '../../utils/types';
import { BackDrop } from '../BackDrop/BackDrop';
import { EditTask } from '../EditTask/EditTask';

export const Schedule = () => {
  const { date } = useParams();
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const holidays = useAppSelector(state => state.holidays.items).filter(holiday => holiday.date === date);
  const tasks = useAppSelector(state => state.todos.items).find(task => task.date === date)?.tasks || [];
  const [newTask, setNewTask] = useState('');
  const [taskType, setTaskType] = useState<string>('grey');
  const dispatch = useAppDispatch();

  const addTaskHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !!newTask.trim()) {
      const savedTask = newTask;
      const type = taskType;

      setNewTask('');
      setTaskType('grey');
      dispatch(addTodoAC(savedTask, date || '', type));
    }
  }

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    if (!!date) {
      dispatch(setReorderedTasks(date, items));
    }
  }

  const removeTaskHandler = (taskId: number) => {
    if (!date) {
      return;
    }

    dispatch(removeTodoAC(date, taskId));
  }

  return (
    <>
      <div className="schedule">
        <div className="holiday-list">
          <h2 className="text-center">Holidays</h2>

          {!holidays.length && (
            <p className="no-info-notifications">There are no holidays today</p>
          )}

          {holidays.map(holiday => (
            <div key={holiday.name} className="holiday">
              {holiday.name}
            </div>
          ))}
        </div>

        <div className="tasks">
          <h2 className="text-center">Tasks</h2>

          <div className="search-container">
            <label htmlFor="taskType">Choose task type: </label>
            <select
              id="taskType"
              className="mb10"
              value={taskType}
              onChange={e => setTaskType(e.target.value)}
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
              placeholder="Add new task..."
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={addTaskHandler}
            />
          </div>

          {!tasks.length && (
            <p className="no-info-notifications">
              There are no tasks today yet
            </p>
          )}

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="task"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          onDoubleClick={() => setEditedTask(task)}
                        >
                          {task.task}

                          <img
                            src="data:image/png;base64,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"
                            className="remove-task"
                            onClick={() => removeTaskHandler(task.id)}
                            alt=""
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {!!editedTask && !!date && (
        <>
          <BackDrop onClick={() => setEditedTask(null)} />
          <EditTask
            date={date}
            task={editedTask}
            onClose={() => setEditedTask(null)}
          />
        </>
      )}
    </>
  )
}
