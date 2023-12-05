export const localStorageMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    const state = store.getState();

    if (
      action.type === 'ADD_TODO' ||
      action.type === 'REMOVE_TODO'
    ) {
      localStorage.setItem(
        'todos',
        JSON.stringify(state.todos.items),
      );
    }

    return result;
  };
