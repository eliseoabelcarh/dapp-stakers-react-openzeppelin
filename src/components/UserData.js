import React from "react";
import { ListGroup ,Button} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodoAction } from "../redux/actions";

export default function UserData(props) {
  const { id, name , account} = props;
  const dispatch = useDispatch()
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{name}</div>
        {account}
      </div>
      <Button onClick={()=> dispatch(deleteTodoAction(id))} variant="primary" size="sm">
      delete
    </Button >
    </ListGroup.Item>
  );
}
