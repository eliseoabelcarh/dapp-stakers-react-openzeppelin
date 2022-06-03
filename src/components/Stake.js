import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  Button,
  Container,
  Col,
  Row,
  Card,
  ListGroup,
  Form,
} from "react-bootstrap";
import StakerModel from "../services/StakerModel";

function Stake(props) {
  const [val, setVal] = useState("");
  const [formValid, setFormValid] = useState(false);
  const currentStaker = useSelector((state) => state.currentStaker);
  const withdraw = () => {
    unstakeTokens();
  };
  const { rwdBalance, stakeTokens, unstakeTokens } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    console.log("valor: ", val);
    console.log("formValid", formValid);
    console.log("checkValidity", form.checkValidity()); //cheka colo si esta vacío o no
    if (form.checkValidity() === true && formValid === true) {
      //stake tokens
      let amount = StakerModel.toWei(val);
      console.log("valorStakerModel.ToWei: ", StakerModel.toWei(val));
      stakeTokens(amount);
    } else {
      //mostrar error
    }
  };

  const contenido = <div className="p-2" style={{ backgroundColor: "#DADADA" }}>
  <h5
    className="mt-3 mr-3"
    style={{ display: "flex", justifyContent: "flex-end" }}
  >
    Your Account
  </h5>
  <Container>
    <Row className="justify-content-md-center">
      <Col md="auto">
        <Card style={{ width: "18rem" }}>
          <ListGroup className="text-center" variant="flush">
            <ListGroup.Item>Staking Balance</ListGroup.Item>
            <ListGroup.Item>
              {currentStaker.stakingBalance} {currentStaker.symbolToken}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col md="auto">
        {" "}
        <Card style={{ width: "18rem" }}>
          <ListGroup className="text-center" variant="flush">
            <ListGroup.Item>Reward Balance</ListGroup.Item>
            <ListGroup.Item>{rwdBalance} RWD</ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  </Container>
  <Card className="m-3">
    <Card.Body>
      <Stack direction="horizontal" gap={2} className="m-2">
        <div className=" ms-auto">
          Current Balance: {currentStaker.balance}
        </div>
      </Stack>

      <Form noValidate validated={formValid} onSubmit={handleSubmit}>
        <Stack style={{ display: "flex" }} direction="horizontal" gap={2}>
          <Form.Control
            required
            className="me-auto"
            placeholder="0"
            type="decimal"
            onChange={(e) => {
              setVal(e.target.value);
              setFormValid(
                Number(e.target.value) <= currentStaker.balance &&
                  Number(e.target.value) > 0
              );
            }}
          />
          <div className="bg-light border p-1">
            {currentStaker.symbolToken}
          </div>
        </Stack>
        <Stack
          style={{ display: "flex", flexDirection: "column" }}
          gap={2}
          className="col-md-5 mx-auto m-4 text-center"
        >
          <Button variant="primary" type="submit" className="mb-1">
            Deposit
          </Button>
          <Button variant="secondary" onClick={withdraw}>
            Withdraw
          </Button>
        </Stack>
      </Form>
    </Card.Body>
  </Card>
</div>
  return (
    <>{currentStaker.account ? contenido : <div>Conecta tu Wallet para empezar</div>}</>
  );
}

Stake.defaultProps = {
  rwdBalance: "0.015",
  stakeTokens: () => {},
  unstakeTokens: () => {},
};

export default Stake;
