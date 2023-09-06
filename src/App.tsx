/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Todo not found'))
      .finally(() => setIsLoading(false));
  }, []);

  // const filterTodos = (filteredTodos: Todo[], status: Status, searchTodo: string): Todo[] => {
  //   if (status === Status.all && !searchTodo.trim()) {
  //     return filteredTodos;
  //   }

  //   return filteredTodos.filter(currentTodo => {
  //     if (status === Status.active && currentTodo.completed) {
  //       return false;
  //     }

  //     if (status === Status.completed && !currentTodo.completed) {
  //       return false;
  //     }

  //     if (searchTodo.trim()
  //       && !currentTodo.title.toLowerCase().includes(searchTodo.toLowerCase())
  //     ) {
  //       return false;
  //     }

  //     return true;
  //   });
  // };

  // const visibleTodos = useMemo(() => {
  //   return filterTodos(todos, filter, query);
  // }, [todos, filter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todos.length > 0 ? (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  filter={filter}
                  query={query}
                />
              ) : (
                <p>{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          close={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
