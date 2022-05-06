import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, fetchTodos } from "../actions";
import { StoreState } from "../reducers";

export const App = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: StoreState) => state);
  const [fetching, setFetching] = useState(false);

  const onClick = () => {
    setFetching(true);

    fetchTodos(dispatch).then(() => setFetching(false));
  };

  const onTodoClick = (id: number) => dispatch(deleteTodo(id));

  return (
    <div>
      {fetching && <span>Loading...</span>}
      {todos.map(({ id, title }) => (
        <div key={id} onClick={() => onTodoClick(id)}>
          {title}
        </div>
      ))}
      <br />
      <button onClick={onClick}>Fetch</button>
    </div>
  );
};
