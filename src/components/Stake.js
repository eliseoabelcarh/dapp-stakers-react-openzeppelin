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
  Modal,
} from "react-bootstrap";
import StakerModel from "../services/StakerModel";

function Stake(props) {
  const [val, setVal] = useState("");
  const [formValid, setFormValid] = useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalSubTitle, setModalSubTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalLink, setModalLink] = useState("");
  const [modalLinkText, setModalLinkText] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const currentStaker = useSelector((state) => state.currentStaker);
  const withdraw = () => {
    unstakeTokens();
  };
  const { rwdBalance } = props;

  const bankContract = useSelector((state) => state.bankContract);
  const tekenTokenContract = useSelector((state) => state.tekenTokenContract);

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
      if (!tekenTokenContract || !bankContract || !currentStaker.account) {
        throw Error("bank contract o teken contract no existe");
      }
      stakeTokens(amount).then((hash) => {
        setVal("");
        setFormValid(false);
        form.elements.fooBar.value = "";
        form.elements.fooBar.noValidate = true;
        mostrarModal(
          "Deposit Success!",
          "",
          "Check Tx Details:",
          "#",
          StakerModel.reduceHashTransaction(hash)
        );
      });
    } else {
      //mostrar error
    }
  };

  const mostrarModal = (title, subtitle, message, link, linkText) => {
    setModalTitle(title);
    setModalSubTitle(subtitle);
    setModalMessage(message);
    setModalLink(link);
    setModalLinkText(linkText);
    handleShow();
  };

  //staking function
  const stakeTokens = (amount) => {
    mostrarModal(
      "Paso 1 de 2",
      "Token Approval",
      "Give permission to access your Token - Check your Wallet",
      "",
      ""
    );
    return new Promise((resolve, reject) => {
      tekenTokenContract.methods
        .approve(bankContract._address, amount)
        .send({ from: currentStaker.account })
        .on("transactionHash", (hash) => {
          mostrarModal(
            "Paso 2 de 2",
            "Deposit Tokens",
            "Transfer Funds and Stake",
            "",
            ""
          );
          bankContract.methods
            .depositTokens(amount)
            .send({ from: currentStaker.account })
            .on("transactionHash", (hash) => {
              console.log("deposittt token SUCCESSS");
              resolve(hash);
            });
        });
    });
  };
  //unstake tokens

  const unstakeTokens = () => {
    bankContract.methods
      .unstakeTokens()
      .send({ from: currentStaker.account  })
      .on("transactionHash", (hash) => {
        mostrarModal("Withdraw Success!", "","Tx Details:","#",StakerModel.reduceHashTransaction(hash))
      });
  };

  const contenido = (
    <div className="p-2" style={{ backgroundColor: "#DADADA" }}>
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
                name="fooBar"
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
                Withdraw All
              </Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{modalSubTitle}</h5>
          <p>{modalMessage}</p>
          <a href={modalLink}>{modalLinkText}</a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {currentStaker.account ? (
        contenido
      ) : (
        <div>Conecta your Wallet first!!</div>
      )}
    </>
  );
}

Stake.defaultProps = {
  rwdBalance: "0.015",
  stakeTokens: () => {},
  unstakeTokens: () => {},
};

export default Stake;
