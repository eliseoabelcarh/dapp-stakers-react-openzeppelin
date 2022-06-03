import React from "react";
//import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../images/logo.svg";
import LoadingButton from "../components/LoadingButton.js";
import WelcomeWallet from "./WelcomeWallet";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";

export default function NavMenu() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const currentAddress = useSelector((state) => state.currentStaker.account);

  const dispatch = useDispatch();
  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      alert("Please connect Metamaskk");
    } else if (accounts[0] !== currentAccount) {
      //window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    }
  };
  const onLogout = () => {
    setIsConnected(false);
  };

  useEffect(() => {
    setCurrentAccount(currentAddress)
    setIsConnected(true);
  }, [currentAddress]);
  

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {"  "}
            Dapp React
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {!isConnected || !currentAccount && (
              <LoadingButton onLogin={onLogin} onLogout={onLogout} />
            )}
            {isConnected && currentAccount && <WelcomeWallet currentAccount={currentAccount} />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
