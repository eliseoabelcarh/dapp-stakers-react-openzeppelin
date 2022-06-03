import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodoAction } from "../redux/actions";
import StakerModel from "../services/StakerModel";

export default function UserData(props) {
  const { id, account, stakingBalance, symbolTokenStaked } = props;
  const dispatch = useDispatch();
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{StakerModel.reduceWallet(account)}</div>
        <small> {symbolTokenStaked} - {" "}
          Staking Balance:
        </small>{ " "}
         {stakingBalance}
      </div>
    </ListGroup.Item>
  );
}
