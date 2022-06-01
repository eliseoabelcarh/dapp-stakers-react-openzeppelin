import React from "react";
import { ListGroup } from "react-bootstrap";
import UserData from "./UserData";

import { useSelector, useDispatch } from "react-redux";
import { deleteTodoAction } from "../redux/actions";

export default function UserDataList() {
  const todos = useSelector((state) => state.todos);
  return (
    <ListGroup as="ol" numbered="true">
      {todos.map((todo) => {
        return <UserData key={todo.id} id={todo.id} name={todo.name} account="0x0x" />;
      })}
    </ListGroup>
  );
}
