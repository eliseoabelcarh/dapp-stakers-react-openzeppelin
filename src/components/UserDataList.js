import React from "react";
import { ListGroup, Card, Badge } from "react-bootstrap";
import UserData from "./UserData";

import { useSelector, useDispatch } from "react-redux";



export default function UserDataList() {
  const stakers = useSelector((state) => state.stakers);
  return (
    <Card className="p-3">

      <div style={{display:"flex", justifyContent:"space-between", alignContent:"center", alignItems:"center"}}>
         <h3 className="text-center">Stakers List</h3>
      <Badge style={{padding:"7px", paddingBottom:"5px"}} text="light" bg="dark">BOOK</Badge>
      </div>
     


       <ListGroup as="ol" numbered="true" >
      {stakers.map((staker) => {
        return <UserData key={staker.id} id={staker.id} account={staker.account} stakingBalance={staker.stakingBalance} symbolTokenStaked={staker.symbolTokenStaked} />;
      })}
    </ListGroup>
    </Card>
   
  );
}
