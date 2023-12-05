import { Task, Todo } from "../utils/types";

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const REORDER_TASKS = 'REORDER_TASKS';
const UPDATE_TASK = 'UPDATE_TASK';

const getTodos = (): Todo[] => {
  const savedFavoritesData = localStorage.getItem('todos');

  return savedFavoritesData ? JSON.parse(savedFavoritesData) : [];
};

const initialState: InitialState = {
  items: getTodos(),
};

type InitialState = {
  items: Todo[],
};

const todosReducer = (
  state = initialState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        items: !!state.items.find(item => item.date === action.date)
          ? state.items.map(item => {
              if (item.date === action.date) {
                return {
                  ...item,
                  tasks: [...item.tasks, action.task],
                };
              } else {
                return item;
              }
            })
          : [...state.items, {date: action.date, tasks: [action.task]}]
      };

    case REMOVE_TODO:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.date === action.date) {
            return {
              ...item,
              tasks: item.tasks.filter(t => t.id !== action.taskId),
            };
          } else {
            return item;
          }
        })
      }

    case REORDER_TASKS: 
      return {
        ...state,
        items: state.items.map(item => {
          if (item.date === action.date) {
            return {
              ...item,
              tasks: action.tasks,
            }
          }

          return item;
        })
      }

    case UPDATE_TASK:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.date === action.date) {
            return {
              ...item,
              tasks: item.tasks.map(task => {
                if (task.id === action.task.id) {
                  return action.task;
                }

                return task;
              })
            }
          }

          return item;
        })
      }
  
    default:
      break;
  }
  return state;
}

//action creators
export const addTodoAC = (task: string, date: string, type: string): AddTodo => {
  const id = +new Date();

  return {
    type: ADD_TODO,
    task: {task, id, type},
    date,
  }
}

export const removeTodoAC = (date: string, taskId: number): RemoveTodo => {
  return {
    type: REMOVE_TODO,
    date,
    taskId,
  }
}

export const setReorderedTasks = (date: string, tasks: Task[]): ReorderTasks => {
  return {
    type: REORDER_TASKS,
    date,
    tasks,
  }
}

export const updateTaskAC = (date: string, task: Task): UpdateTask => {
  return {
    type: UPDATE_TASK,
    date,
    task,
  }
}

type AddTodo = {
  type: typeof ADD_TODO,
  task: Task,
  date: string,
}

type RemoveTodo = {
  type: typeof REMOVE_TODO,
  date: string,
  taskId: number,
}

type ReorderTasks = {
  type: typeof REORDER_TASKS,
  date: string,
  tasks: Task[],
}

type UpdateTask = {
  type: typeof UPDATE_TASK,
  task: Task,
  date: string,
}

type ActionTypes = AddTodo | RemoveTodo | ReorderTasks | UpdateTask;

export default todosReducer;
