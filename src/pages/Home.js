import Header from "../components/Header";
import Meta from "../components/Meta";
import UserDataList from "../components/UserDataList";
import React, { Component } from 'react'

export default class Home extends Component {
  
  render() {
    // page content
  const pageTitle = "Home";
  const pageDescription = "welcome to my boilerplate dapp";
    return (
      <div>
      <Meta title={pageTitle} />
      <Header head={pageTitle} description={pageDescription} />
      <UserDataList/>
    </div>
    )
  }
}




