import React from "react";
//import { Link } from "react-router-dom";
import {  useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../images/logo.svg";
import LoadingButton from "../components/LoadingButton.js";
import WelcomeWallet from "./WelcomeWallet";
import Web3 from "web3";
import { useDispatch } from "react-redux";
import { addTodoAction } from "../redux/actions";

export default function NavMenu() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null)
  const dispatch = useDispatch()
  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts()
    if(accounts.length === 0){
        console.log("Please connect Metamask")
    }else if(accounts[0] !== currentAccount){
        setCurrentAccount(accounts[0])
        setIsConnected(true);
        //agrego a lista de usuarios conectados
        const userAccount = {id:"s",name:accounts[0],complete:false}
        dispatch(addTodoAction(userAccount))
    }
    
  };
  const onLogout = () => {
    setIsConnected(false);
  };

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
            {!isConnected && (
              <LoadingButton onLogin={onLogin} onLogout={onLogout} />
            )}
            {isConnected && <WelcomeWallet currentAccount={currentAccount}/>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
