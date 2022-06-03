import Header from "../components/Header";
import Meta from "../components/Meta";
import UserDataList from "../components/UserDataList";
import React, { Component } from "react";
import Stake from "../components/Stake";
import { Container, Card, Stack, Col, ListGroup, Row } from "react-bootstrap";

export default class Home extends Component {
  render() {
    // page content
    const pageTitle = "Decentral Bank";
    const pageDescription = "Stake your tokens";
    return (
      <>
        <Meta title={pageTitle} />
        <Header head={pageTitle} description={pageDescription} />
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto" style={{ width: "50vh" }}>
              <UserDataList />
            </Col>
            <Col md="auto">
              {" "}
              <Stake />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
